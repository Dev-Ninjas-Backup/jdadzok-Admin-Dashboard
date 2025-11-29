import React from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  product: any;
}

const MarketPlaceModal: React.FC<ModalProps> = ({ isOpen, closeModal, product }) => {
  if (!isOpen) return null; // If the modal is closed, don't render it

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-5xl z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Product Details</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 cursor-pointer">
            X
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium">Product: {product.title}</h3>
          <p className="text-sm text-gray-600">Seller: {product.seller}</p>
          <p className="text-sm text-gray-600">Category: {product.category}</p>
          <p className="text-lg font-semibold">Price: {product.price}</p>
          <p className={`text-sm font-medium ${product.stock === 0 ? 'text-red-500' : 'text-green-600'}`}>
            {product.stock === 0 ? "Out of Stock" : `${product.stock} in stock`}
          </p>
          <div className="mt-2">
            <span className="text-sm text-gray-500">Rating: </span>
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`text-xs ${index < product.rating ? "text-yellow-500" : "text-gray-300"}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={closeModal}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MarketPlaceModal;
