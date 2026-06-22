import React, { useState } from 'react';
import { Check } from 'lucide-react';

// --- TYPES ---
interface OrderFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  churchName: string;
  productType: 'tshirt' | 'polo';
  size: string;
  color: string;
  quantity: number;
  pickupPreference: string;
  gdprConsent: boolean;
}

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  orderDetails: {
    item: string;
    size: string;
    color: string;
    quantity: number;
    total: number;
  };
}

// --- SUCCESS MODAL ---
const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, title, message, orderDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 border border-gray-100">
        <div className="p-6 md:p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>

          <h3 className="text-2xl font-serif font-medium text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            {message}
          </p>

          {/* Receipt detail box */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left border border-gray-100 space-y-2">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Order Summary</h4>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Item:</span>
              <span className="font-medium text-gray-900">{orderDetails.item}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Details:</span>
              <span className="font-medium text-gray-900">Size {orderDetails.size} • {orderDetails.color}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Qty:</span>
              <span className="font-medium text-gray-900">{orderDetails.quantity}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-semibold text-[#0E1745]">
              <span>Estimated Total:</span>
              <span>GBP {orderDetails.total.toFixed(2)}</span>
            </div>
            <p className="text-xxs text-gray-400 text-center pt-2 leading-tight">
              Payment will be collected at pickup.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-3.5 bg-[#0E1745] text-sm font-semibold text-white hover:bg-[#162366] focus:outline-none transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN MERCHANDISE ORDER FORM ---
const MerchandiseOrderForm: React.FC = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialFormData: OrderFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    churchName: '',
    productType: 'tshirt',
    size: 'M',
    color: 'Navy Blue',
    quantity: 1,
    pickupPreference: 'rehearsal',
    gdprConsent: false,
  };

  const [formData, setFormData] = useState<OrderFormData>(initialFormData);

  // Pricing definitions
  const prices = {
    tshirt: 15.0,
    polo: 20.0,
  };

  const getProductPrice = () => prices[formData.productType];
  const getOrderTotal = () => getProductPrice() * formData.quantity;

  const handleInputChange = (field: keyof OrderFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.gdprConsent) {
      alert("Please check the consent box to proceed.");
      return;
    }

    setIsSubmitting(true);
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://1000t-admin.vercel.app/api';

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phoneNumber,
        churchName: formData.churchName,
        productName: formData.productType === 'tshirt' ? '1000 Tongues T-Shirt' : '1000 Tongues Polo Shirt',
        productType: formData.productType,
        size: formData.size,
        color: formData.color,
        quantity: Number(formData.quantity),
        price: getProductPrice(),
        totalAmount: getOrderTotal(),
        pickupPreference: formData.pickupPreference,
        gdprConsent: formData.gdprConsent,
      };

      const response = await fetch(`${API_URL}/merchandise`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error saving order');
      }

      setShowSuccessModal(true);
    } catch (err: any) {
      console.error("Order error:", err);
      alert(`Failed to submit order: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    setFormData(initialFormData);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const colors = ['Navy Blue', 'White', 'Gold'];

  return (
    <div className="bg-[#f8f9fc] font-sans pb-16">
      {/* Mini Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl font-serif text-[#0E1745] mb-3 leading-tight">
            Order Your Gear
          </h1>
          <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Get your official 1000Tongues branded T-Shirt or Polo Shirt to wear on the event day, and help support the choir.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Selection Form (8 cols) */}
            <div className="lg:col-span-8 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10 space-y-8">

              {/* Product Selection */}
              <div>
                <h3 className="text-lg font-serif text-[#0E1745] mb-4 border-b border-gray-100 pb-2">
                  1. Choose Apparel
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* T-Shirt Option */}
                  <div
                    onClick={() => handleInputChange('productType', 'tshirt')}
                    className={`border rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between h-40 ${formData.productType === 'tshirt'
                        ? 'border-[#0E1745] bg-[#0E1745]/5 ring-2 ring-[#0E1745]/20'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-semibold tracking-wide text-gray-400 uppercase">T-Shirt</span>
                      {formData.productType === 'tshirt' && <Check className="w-5 h-5 text-[#0E1745]" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Branded Crewneck</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Premium soft cotton fit</p>
                    </div>
                    <div className="text-lg font-extrabold text-[#0E1745] mt-2">
                      GBP 15.00
                    </div>
                  </div>

                  {/* Polo Option */}
                  <div
                    onClick={() => handleInputChange('productType', 'polo')}
                    className={`border rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between h-40 ${formData.productType === 'polo'
                        ? 'border-[#0E1745] bg-[#0E1745]/5 ring-2 ring-[#0E1745]/20'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-semibold tracking-wide text-gray-400 uppercase">Polo</span>
                      {formData.productType === 'polo' && <Check className="w-5 h-5 text-[#0E1745]" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Branded Polo Shirt</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Classic collar corporate look</p>
                    </div>
                    <div className="text-lg font-extrabold text-[#0E1745] mt-2">
                      GBP 20.00
                    </div>
                  </div>

                </div>
              </div>

              {/* Sizes and Colors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">

                {/* Sizes Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Select Size</label>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => handleInputChange('size', sz)}
                        className={`py-3 border rounded-xl font-medium text-sm transition-all ${formData.size === sz
                            ? 'border-[#0E1745] bg-[#0E1745]/5 text-[#0E1745] font-semibold'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                          }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Select Color</label>
                  <div className="space-y-2">
                    {colors.map((col) => (
                      <button
                        key={col}
                        type="button"
                        onClick={() => handleInputChange('color', col)}
                        className={`w-full flex items-center justify-between p-3.5 border rounded-xl text-left transition-all ${formData.color === col
                            ? 'border-[#0E1745] bg-[#0E1745]/5 text-[#0E1745] font-semibold'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                          }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className={`w-3.5 h-3.5 rounded-full border border-black/10 ${col === 'Navy Blue' ? 'bg-[#0E1745]' : col === 'White' ? 'bg-white' : 'bg-[#FFD100]'
                            }`} />
                          <span>{col}</span>
                        </div>
                        {formData.color === col && <Check className="w-4 h-4 text-[#0E1745]" />}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Personal Details */}
              <div className="pt-4">
                <h3 className="text-lg font-serif text-[#0E1745] mb-6 border-b border-gray-100 pb-2">
                  2. Delivery & Contact Details
                </h3>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">First Name</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="John"
                        className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0E1745]/20 focus:border-[#0E1745]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Last Name</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Doe"
                        className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0E1745]/20 focus:border-[#0E1745]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john@example.com"
                        className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0E1745]/20 focus:border-[#0E1745]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        placeholder="+44 7123 456789"
                        className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0E1745]/20 focus:border-[#0E1745]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Home Church/Fellowship (Optional)</label>
                      <input
                        type="text"
                        value={formData.churchName}
                        onChange={(e) => handleInputChange('churchName', e.target.value)}
                        placeholder="E.g., St. Mark's"
                        className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0E1745]/20 focus:border-[#0E1745]"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Pickup Preference</label>
                      <select
                        value={formData.pickupPreference}
                        onChange={(e) => handleInputChange('pickupPreference', e.target.value)}
                        className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0E1745]/20 focus:border-[#0E1745] appearance-none cursor-pointer bg-white"
                      >
                        <option value="rehearsal">Collect at Choir Rehearsal</option>
                        <option value="event">Collect at Main Event Venue</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2 border-t border-gray-100">
                <label className="flex items-start cursor-pointer group">
                  <div className="relative flex items-center mt-1">
                    <input
                      type="checkbox"
                      required
                      checked={formData.gdprConsent}
                      onChange={(e) => handleInputChange('gdprConsent', e.target.checked)}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-[#0E1745] checked:bg-[#0E1745]"
                    />
                    <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" size={14} />
                  </div>
                  <span className="ml-3 text-sm text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">
                    I consent to 1000 Tongues storing my order info and contacting me when my item is ready for pickup and payment.
                  </span>
                </label>
              </div>

            </div>

            {/* Right Column: Checkout Summary (4 cols) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">

              {/* Receipt card */}
              <div className="bg-[#0E1745] text-white rounded-3xl p-6 shadow-xl space-y-6 relative overflow-hidden">
                {/* Background graphic */}
                <div className="absolute right-0 top-0 w-24 h-24 bg-[#FFD100]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-lg font-bold tracking-wide uppercase text-[#FFD100]">Order Summary</h3>
                  <p className="text-xs text-white/60 mt-0.5">Review your selections</p>
                </div>

                <div className="space-y-4 text-sm border-b border-white/10 pb-4">
                  <div className="flex justify-between">
                    <span className="text-white/65">Product:</span>
                    <span className="font-semibold text-right">
                      {formData.productType === 'tshirt' ? '1000 Tongues T-Shirt' : '1000 Tongues Polo Shirt'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/65">Options:</span>
                    <span className="font-semibold">{formData.color} • Size {formData.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/65">Quantity:</span>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleInputChange('quantity', Math.max(1, formData.quantity - 1))}
                        className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center font-bold text-xs hover:bg-white/20 transition-all"
                      >
                        -
                      </button>
                      <span className="font-semibold w-4 text-center">{formData.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleInputChange('quantity', Math.min(5, formData.quantity + 1))}
                        className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center font-bold text-xs hover:bg-white/20 transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/65">Price per unit:</span>
                    <span className="font-semibold">GBP {getProductPrice().toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-[#FFD100]">Estimated Total:</span>
                  <span className="text-white text-xl">GBP {getOrderTotal().toFixed(2)}</span>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#FFD100] text-[#0E1745] hover:bg-[#ecc200] font-bold rounded-xl text-sm transition-all duration-300 shadow-md hover:scale-[1.01] flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Placing Order...' : 'Submit Order'}</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

            </div>

          </form>

        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccess}
        title="Order Placed!"
        message={`Thank you, ${formData.firstName}! Your shirt order has been submitted. We will contact you at ${formData.email} when it is ready.`}
        orderDetails={{
          item: formData.productType === 'tshirt' ? '1000 Tongues T-Shirt' : '1000 Tongues Polo Shirt',
          size: formData.size,
          color: formData.color,
          quantity: formData.quantity,
          total: getOrderTotal(),
        }}
      />
    </div>
  );
};

export default MerchandiseOrderForm;
