// src/components/ListingCard.js
import React, { useState } from 'react';
import axios from 'axios';
import { FaBed, FaBath, FaHeart, FaRegHeart, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
import SellerDetailsPopup from './SellerDetailsPopup';

const ListingCard = ({ property, onClick }) => {
  const [liked, setLiked] = useState(false);
  const [showSellerDetails, setShowSellerDetails] = useState(false);
  const [sellerDetails, setSellerDetails] = useState(null);

  const handleLike = async () => {
    setLiked(!liked);
    try {
      await axios.post('/api/buyer/like', { propertyId: property._id });
    } catch (error) {
      console.error('Error liking property:', error);
    }
  };

  const handleInterest = async () => {
    try {
      const { data } = await axios.post('/api/buyer/interested', { propertyId: property._id });
      setSellerDetails(data.seller);
      setShowSellerDetails(true);
    } catch (error) {
      console.error('Error getting seller details:', error);
    }
  };

  const closeSellerDetailsPopup = () => {
    setShowSellerDetails(false);
  };

  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300"
      onClick={onClick}
    >
      <div className="relative">
        <img src={property.image} alt={property.name} className="w-full h-48 object-cover" />
        <span className="bg-blue-500 text-white px-2 py-1 absolute top-0 left-0 rounded-br-lg text-xs font-semibold">
          {property.propertyType}
        </span>
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-white text-2xl"
          onClick={(e) => {
            e.stopPropagation();
            handleLike();
          }}
        >
          {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />} <span>{property.likes}</span>
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{property.name}</h3>
        <p className="text-gray-600 flex items-center"><FaMapMarkerAlt className="mr-1" /> {property.location}</p>
        <p className="text-gray-600 flex items-center"><FaDollarSign className="mr-1" /> {property.price}</p>
        <div className="flex items-center text-gray-600">
          <FaBed className="mr-1" /> {property.bedrooms} <span className="mx-2">|</span> <FaBath className="mr-1" /> {property.bathrooms}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={(e) => {
              e.stopPropagation();
              handleInterest();
            }}
          >
            I'm Interested
          </button>
        </div>
      </div>
      {showSellerDetails && (
        <SellerDetailsPopup sellerDetails={sellerDetails} onClose={closeSellerDetailsPopup} />
      )}
    </div>
  );
};

export default ListingCard;
