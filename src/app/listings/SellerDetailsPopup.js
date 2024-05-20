// src/components/SellerDetailsPopup.js
import React from 'react';

const SellerDetailsPopup = ({ sellerDetails, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Seller Details</h2>
        <p>Name: {sellerDetails.name}</p>
        <p>Email: {sellerDetails.email}</p>
        <p>Phone: {sellerDetails.phone}</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SellerDetailsPopup;
