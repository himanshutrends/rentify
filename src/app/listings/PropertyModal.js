// src/components/PropertyModal.js
'use client';
import React from 'react';
import { FaBed, FaBath, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';

const PropertyModal = ({ property, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg overflow-hidden w-3/4 lg:w-1/2">
        <div className="relative">
          <img src={property.image} alt={property.name} className="w-full h-64 object-cover" />
          <button
            className="absolute top-0 right-0 mt-2 mr-2 text-white text-2xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800">{property.name}</h3>
          <p className="text-gray-600 flex items-center"><FaMapMarkerAlt className="mr-1" /> {property.location}</p>
          <p className="text-gray-600 flex items-center"><FaDollarSign className="mr-1" /> {property.price}</p>
          <div className="flex items-center text-gray-600">
            <FaBed className="mr-1" /> {property.bedrooms} <span className="mx-2">|</span> <FaBath className="mr-1" /> {property.bathrooms}
          </div>
          <p className="text-gray-600 mt-4">Nearby: {property.nearby}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
