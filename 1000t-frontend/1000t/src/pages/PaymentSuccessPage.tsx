import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Loader2, Mail, Calendar, Heart } from 'lucide-react';

interface OrderDetails {
  firstName: string;
  lastName: string;
  email: string;
  productName: string;
  productType: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  donationAmount: number;
  totalAmount: number;
  pickupPreference: string;
  paymentStatus: string;
}

interface DonationDetails {
  name: string;
  email: string;
  amount: number;
  givingType: string;
  paymentStatus: string;
}

const PaymentSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');
  const donationId = searchParams.get('donation_id');
  const type = searchParams.get('type');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [donation, setDonation] = useState<DonationDetails | null>(null);

  useEffect(() => {
    const fetchReceiptDetails = async () => {
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://1000t-admin.vercel.app/api';
      
      if (type === 'donation') {
        if (!donationId) {
          setError("Missing donation details reference.");
          setLoading(false);
          return;
        }

        try {
          const response = await fetch(`${API_URL}/payment/donation/${donationId}`);
          const data = await response.json();

          if (response.ok && data.success) {
            setDonation(data.donation);
          } else {
            setError(data.message || "Failed to load donation details.");
          }
        } catch (err: any) {
          console.error("Error fetching donation receipt:", err);
          setError("Could not connect to verification server.");
        } finally {
          setLoading(false);
        }
      } else {
        if (!orderId) {
          setError("Missing order details reference.");
          setLoading(false);
          return;
        }

        try {
          const response = await fetch(`${API_URL}/payment/order/${orderId}`);
          const data = await response.json();

          if (response.ok && data.success) {
            setOrder(data.order);
          } else {
            setError(data.message || "Failed to load receipt details.");
          }
        } catch (err: any) {
          console.error("Error fetching order receipt:", err);
          setError("Could not connect to verification server.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchReceiptDetails();
  }, [orderId, donationId, type]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] flex flex-col items-center justify-center p-6">
        <Loader2 className="w-12 h-12 text-[#0E1745] animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Verifying payment details...</p>
      </div>
    );
  }

  if (error || (type !== 'donation' && !order) || (type === 'donation' && !donation)) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white rounded-3xl p-8 shadow-xl max-w-md w-full border border-red-100">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-serif text-[#0E1745] mb-2">Receipt Verification Failed</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            {error || "We couldn't retrieve the details for this transaction."}
          </p>
          <Link
            to="/join-choir"
            className="w-full inline-flex justify-center rounded-xl bg-[#0E1745] text-white py-3.5 px-4 font-semibold hover:bg-[#162366] transition-colors"
          >
            Back to Merchandise Page
          </Link>
        </div>
      </div>
    );
  }

  const isDonation = type === 'donation' && donation;

  return (
    <div className="bg-[#f8f9fc] font-sans min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Header Block */}
        <div className="bg-[#0E1745] text-white p-8 md:p-12 text-center relative">
          <div className="absolute right-0 top-0 w-32 h-32 bg-[#FFD100]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-500/10 mb-6 border border-green-500/25">
            <CheckCircle className="h-10 w-10 text-green-400" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-serif text-white mb-2 leading-tight">
            Thank you, {isDonation ? donation.name : order?.firstName}!
          </h1>
          <p className="text-white/70 max-w-md mx-auto text-sm leading-relaxed">
            Your transaction has completed successfully. Your support makes a huge difference to the 1000tongues choir.
          </p>
        </div>

        {/* Receipt content */}
        <div className="p-6 md:p-10 space-y-8">
          
          {/* Order Status Box */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-green-50/50 rounded-2xl border border-green-100 gap-2">
            <div>
              <span className="text-xs font-semibold text-green-800 uppercase tracking-wider">Payment Status</span>
              <p className="text-sm font-bold text-[#0E1745] mt-0.5">Paid Successfully via Card</p>
            </div>
            <div className="text-right sm:text-left">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Reference Code</span>
              <code className="text-xs font-mono font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded mt-0.5 block sm:inline-block">
                {isDonation 
                  ? (donationId ? donationId.substring(donationId.length - 8).toUpperCase() : 'N/A')
                  : (orderId ? orderId.substring(orderId.length - 8).toUpperCase() : 'N/A')}
              </code>
            </div>
          </div>

          {isDonation ? (
            /* Donation Receipt Layout */
            <>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2 mb-4">
                  Donation Details
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-2">
                      <Heart className="w-5 h-5 text-red-500 fill-red-500 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-bold text-gray-800 text-base">
                          {donation.givingType === 'monthly' ? 'Monthly Partnership Support' : 'One-Time Donation'}
                        </h4>
                        <p className="text-sm text-gray-500 mt-0.5">
                          Thank you for partnering with 1000 Tongues.
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-800">
                        GBP {donation.amount.toFixed(2)}
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {donation.givingType === 'monthly' ? 'per month' : 'one-time'}
                      </p>
                    </div>
                  </div>

                  {/* Total amount summary card */}
                  <div className="bg-[#0E1745]/5 rounded-2xl p-5 mt-6 border border-[#0E1745]/10 flex justify-between items-center">
                    <span className="font-bold text-[#0E1745]">Amount Processed</span>
                    <span className="text-2xl font-extrabold text-[#0E1745]">
                      GBP {donation.amount.toFixed(2)} {donation.givingType === 'monthly' ? '/ mo' : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* Partnership confirmation */}
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                <h4 className="font-serif font-bold text-[#0E1745] text-lg flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500 shrink-0" />
                  Partnership Confirmation
                </h4>
                
                <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-800">Confirmation:</span>
                      <p className="mt-0.5">
                        We have sent a transactional receipt email containing these details to <span className="font-semibold text-gray-800">{donation.email}</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 text-center flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/home"
                  className="inline-flex justify-center items-center px-6 py-3.5 bg-[#0E1745] hover:bg-[#162366] text-white font-bold rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Return Home
                </Link>
                <Link
                  to="/partnership"
                  className="inline-flex justify-center items-center px-6 py-3.5 bg-white hover:bg-gray-50 border border-gray-200 text-[#0E1745] font-bold rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Back to Partnership
                </Link>
              </div>
            </>
          ) : (
            /* Merchandise Order Receipt Layout */
            <>
              {order && (
                <>
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2 mb-4">
                      Item Details
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-800 text-base">{order.productName}</h4>
                          <p className="text-sm text-gray-500 mt-0.5">
                            Size: <span className="font-semibold text-gray-700">{order.size}</span> &bull; Color: <span className="font-semibold text-gray-700">{order.color}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-gray-800">
                            GBP {(order.price * order.quantity).toFixed(2)}
                          </span>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {order.quantity} &times; GBP {order.price.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Donation line */}
                      {order.donationAmount > 0 && (
                        <div className="flex justify-between items-start pt-3 border-t border-gray-100">
                          <div className="flex items-start space-x-2">
                            <Heart className="w-5 h-5 text-red-500 fill-red-500 mt-0.5 shrink-0" />
                            <div>
                              <h4 className="font-bold text-gray-800 text-sm">Freewill Choir Support</h4>
                              <p className="text-xs text-gray-500">Thank you for your generous contribution!</p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-gray-800">
                            GBP {order.donationAmount.toFixed(2)}
                          </span>
                        </div>
                      )}

                      {/* Total amount summary card */}
                      <div className="bg-[#0E1745]/5 rounded-2xl p-5 mt-6 border border-[#0E1745]/10 flex justify-between items-center">
                        <span className="font-bold text-[#0E1745]">Amount Processed</span>
                        <span className="text-2xl font-extrabold text-[#0E1745]">
                          GBP {order.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pickup preferences */}
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                    <h4 className="font-serif font-bold text-[#0E1745] text-lg flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-[#FFD100] shrink-0" />
                      Pickup Instructions
                    </h4>
                    
                    <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                      <div className="flex items-start space-x-3">
                        <Calendar className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-800">Collection Choice:</span>
                          <p className="mt-0.5">
                            {order.pickupPreference === 'rehearsal' 
                              ? "Collect at Choir Rehearsal. Ask for the apparel team at your next rehearsal session." 
                              : "Collect at the Main Event Venue. Find our merchandise stand on the day of the event."}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Mail className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-800">Confirmation:</span>
                          <p className="mt-0.5">
                            We have sent a transactional receipt email containing these details to <span className="font-semibold text-gray-800">{order.email}</span>.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 text-center flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      to="/home"
                      className="inline-flex justify-center items-center px-6 py-3.5 bg-[#0E1745] hover:bg-[#162366] text-white font-bold rounded-xl text-sm transition-colors cursor-pointer"
                    >
                      Return Home
                    </Link>
                    <Link
                      to="/join-choir"
                      className="inline-flex justify-center items-center px-6 py-3.5 bg-white hover:bg-gray-50 border border-gray-200 text-[#0E1745] font-bold rounded-xl text-sm transition-colors cursor-pointer"
                    >
                      Order More Gear
                    </Link>
                  </div>
                </>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
