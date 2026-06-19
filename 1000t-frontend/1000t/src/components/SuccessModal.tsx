import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  title = "Your Application Was Successful",
  message = "A mail has been sent to you for further steps"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-serif text-gray-900 mb-4">
          {title}
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-sm mb-8 leading-relaxed">
          {message}
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full text-white py-3 px-6 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#0E1745' }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;