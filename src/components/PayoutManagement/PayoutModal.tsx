import React from "react";

interface Transaction {
  id: string;
  name: string;
  type: "Seller" | "NGO";
  avatar: string; // Letter for avatar (G, O, etc.)
  amount: string;
  date: string;
  paymentMethod: "Bank Transfer" | "PayPal";
  accountInfo: string; // Last 4 digits or email
  totalEarned: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Transaction | null;
}


const PayoutModal: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">Transaction Details</h2>
        <div className="space-y-2">
          <div>
            <strong>Name: </strong>{product.name}
          </div>
          <div>
            <strong>Type: </strong>{product.type}
          </div>
          <div>
            <strong>Amount: </strong>{product.amount}
          </div>
          <div>
            <strong>Date: </strong>{product.date}
          </div>
          <div>
            <strong>Payment Method: </strong>{product.paymentMethod}
          </div>
          <div>
            <strong>Total Earned: </strong>{product.totalEarned}
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PayoutModal;
