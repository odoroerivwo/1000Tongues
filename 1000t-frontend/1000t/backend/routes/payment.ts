import { Router } from "express";
import { MongoClient, ObjectId } from "mongodb";
import Stripe from "stripe";

const router = Router();

const uri = process.env.MONGODB_URI;
if (!uri) console.error("Warning: MONGODB_URI is not defined in .env");

const client = new MongoClient(uri || "");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

// Endpoint: Create Stripe Checkout Session
router.post("/payment/create-session", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      productName,
      productType,
      size,
      color,
      quantity,
      price,
      donationAmount,
      pickupPreference,
      gdprConsent,
      originUrl,
    } = req.body;

    // Connect to database
    await client.connect();
    const db = client.db("1000t-admin");
    const collection = db.collection("merchandise_orders");

    // Save order data as pending payment
    const newOrder = {
      firstName,
      lastName,
      email,
      phone,
      churchName: "", // Home church/fellowship removed from UI
      productName,
      productType,
      size,
      color,
      quantity: Number(quantity),
      price: Number(price),
      donationAmount: Number(donationAmount || 0),
      totalAmount: (Number(price) * Number(quantity)) + Number(donationAmount || 0),
      pickupPreference,
      gdprConsent,
      paymentStatus: "Pending Payment",
      status: "Pending",
      submittedAt: new Date()
    };

    const result = await collection.insertOne(newOrder);
    const orderId = result.insertedId.toString();

    // Construct Stripe line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: productName,
            description: `Size: ${size} | Color: ${color} | Qty: ${quantity}`,
          },
          unit_amount: Math.round(Number(price) * 100), // Stripe unit amount is in pence/cents
        },
        quantity: Number(quantity),
      }
    ];

    // Add donation line item if applicable
    if (Number(donationAmount) > 0) {
      lineItems.push({
        price_data: {
          currency: "gbp",
          product_data: {
            name: "Freewill Donation to 1000tongues Choir",
            description: "Support for choir welfare, venue, and production",
          },
          unit_amount: Math.round(Number(donationAmount) * 100),
        },
        quantity: 1,
      });
    }

    // Determine success/cancel landing URLs
    const clientOrigin = originUrl || "http://localhost:5173";
    const successUrl = `${clientOrigin}/payment-success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`;
    const cancelUrl = `${clientOrigin}/payment-cancel?order_id=${orderId}`;

    // Create stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: email,
      metadata: {
        orderId: orderId,
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    res.status(200).json({ success: true, url: session.url });
  } catch (err: any) {
    console.error("❌ Stripe session creation error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Endpoint: Stripe Webhook
router.post("/payment/webhook", async (req: any, res: any) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (endpointSecret && sig) {
      // Use req.rawBody captured in the parser verification callback
      const rawBody = req.rawBody || req.body;
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } else {
      console.warn("⚠️ Warning: STRIPE_WEBHOOK_SECRET is not set. Webhook verification bypassed.");
      // Bypassed for local sandbox development/testing convenience
      const rawBodyString = req.rawBody ? req.rawBody.toString() : JSON.stringify(req.body);
      const payload = JSON.parse(rawBodyString);
      event = {
        type: payload.type,
        data: payload.data
      } as any;
    }
  } catch (err: any) {
    console.error(`❌ Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Process checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    const donationId = session.metadata?.donationId;

    if (orderId) {
      try {
        await client.connect();
        const db = client.db("1000t-admin");
        const collection = db.collection("merchandise_orders");

        const updateResult = await collection.updateOne(
          { _id: new ObjectId(orderId) },
          { 
            $set: { 
              paymentStatus: "Paid", 
              status: "Pending Pickup", 
              stripeSessionId: session.id 
            } 
          }
        );

        console.log(`✅ Order ${orderId} successfully marked as PAID in database.`);
      } catch (dbErr) {
        console.error("❌ Database update failed in webhook:", dbErr);
        return res.status(500).send("Database update failed");
      }
    } else if (donationId) {
      try {
        await client.connect();
        const db = client.db("1000t-admin");
        const collection = db.collection("donations");

        const updateResult = await collection.updateOne(
          { _id: new ObjectId(donationId) },
          { 
            $set: { 
              paymentStatus: "Paid", 
              stripeSessionId: session.id,
              stripeSubscriptionId: (session.subscription as string) || null
            } 
          }
        );

        console.log(`✅ Donation ${donationId} successfully marked as PAID in database.`);
      } catch (dbErr) {
        console.error("❌ Database update failed in webhook:", dbErr);
        return res.status(500).send("Database update failed");
      }
    } else {
      console.warn("⚠️ Webhook session lacks orderId or donationId metadata.");
    }
  }

  res.json({ received: true });
});

// Endpoint: Fetch public order status for success confirmation
router.get("/payment/order/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await client.connect();
    const db = client.db("1000t-admin");
    const collection = db.collection("merchandise_orders");

    const order = await collection.findOne({ _id: new ObjectId(id) });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      order: {
        firstName: order.firstName,
        lastName: order.lastName,
        email: order.email,
        productName: order.productName,
        productType: order.productType,
        size: order.size,
        color: order.color,
        quantity: order.quantity,
        price: order.price,
        donationAmount: order.donationAmount,
        totalAmount: order.totalAmount,
        pickupPreference: order.pickupPreference,
        paymentStatus: order.paymentStatus,
      }
    });
  } catch (err: any) {
    console.error("❌ Error fetching order status:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Endpoint: Fetch public donation status for success confirmation
router.get("/payment/donation/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await client.connect();
    const db = client.db("1000t-admin");
    const collection = db.collection("donations");

    const donation = await collection.findOne({ _id: new ObjectId(id) });
    if (!donation) {
      return res.status(404).json({ success: false, message: "Donation not found" });
    }

    res.status(200).json({
      success: true,
      donation: {
        name: donation.name,
        email: donation.email,
        amount: donation.amount,
        givingType: donation.givingType,
        paymentStatus: donation.paymentStatus,
      }
    });
  } catch (err: any) {
    console.error("❌ Error fetching donation status:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Endpoint: Create Stripe Checkout Session for Donations
router.post("/payment/create-donation-session", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      amount,
      givingType, // "one-time" | "monthly"
      originUrl,
    } = req.body;

    // Connect to database
    await client.connect();
    const db = client.db("1000t-admin");
    const collection = db.collection("donations");

    // Save donation data as pending payment
    const newDonation = {
      name,
      email,
      phone: phone || "",
      amount: Number(amount),
      givingType,
      paymentStatus: "Pending Payment",
      submittedAt: new Date()
    };

    const result = await collection.insertOne(newDonation);
    const donationId = result.insertedId.toString();

    // Construct Stripe line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: givingType === "monthly" ? "1000 Tongues - Monthly Partnership Donation" : "1000 Tongues - One-Time Partnership Donation",
            description: givingType === "monthly" ? `Monthly recurring support of £${amount}` : `One-time donation of £${amount}`,
          },
          unit_amount: Math.round(Number(amount) * 100), // Stripe unit amount is in pence/cents
          ...(givingType === "monthly" && {
            recurring: {
              interval: "month",
            },
          }),
        },
        quantity: 1,
      }
    ];

    // Determine success/cancel landing URLs
    const clientOrigin = originUrl || "http://localhost:5173";
    const successUrl = `${clientOrigin}/payment-success?session_id={CHECKOUT_SESSION_ID}&donation_id=${donationId}&type=donation`;
    const cancelUrl = `${clientOrigin}/payment-cancel?type=donation`;

    // Create stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: givingType === "monthly" ? "subscription" : "payment",
      customer_email: email,
      metadata: {
        donationId: donationId,
        type: "donation",
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    res.status(200).json({ success: true, url: session.url });
  } catch (err: any) {
    console.error("❌ Stripe donation session creation error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
