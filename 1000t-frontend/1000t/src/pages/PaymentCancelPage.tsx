import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { XCircle, AlertTriangle } from 'lucide-react';

const PaymentCancelPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');

  return (
    <div className="bg-[#f8f9fc] font-sans min-h-screen flex flex-col items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 text-center space-y-6">
        
        {/* Error/Alert icon */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-yellow-50 text-yellow-500 border border-yellow-200">
          <XCircle className="h-10 w-10 text-yellow-600" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-serif text-[#0E1745] font-semibold leading-tight">
            Checkout Cancelled
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Your transaction was not completed. No charges were made to your account.
          </p>
        </div>

        {/* Informative info box */}
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-start space-x-3 text-left">
          <AlertTriangle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <p className="text-xs text-gray-500 leading-normal">
            If you experienced issues with your payment method, you can go back to retry. Feel free to contact our support team if the issue persists.
          </p>
        </div>

        {/* Buttons / Actions */}
        <div className="pt-2 flex flex-col gap-3">
          <Link
            to={type === 'donation' ? '/partnership' : '/join-choir?tab=merch'}
            className="w-full inline-flex justify-center items-center py-3.5 bg-[#0E1745] hover:bg-[#162366] text-white font-bold rounded-xl text-sm transition-colors cursor-pointer shadow-md"
          >
            {type === 'donation' ? 'Return to Partnership Page' : 'Return to Merchandise Form'}
          </Link>
          <Link
            to="/home"
            className="w-full inline-flex justify-center items-center py-3.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors cursor-pointer"
          >
            Go back Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PaymentCancelPage;
