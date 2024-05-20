'use client';
import React, { useState } from 'react';
import axios from 'axios';

const AddProperty = () => {
  const [propertyData, setPropertyData] = useState({
    name: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
    image: '',
    nearby: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({
      ...propertyData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPropertyData({
        ...propertyData,
        image: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('/api/properties', propertyData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPropertyData({
        name: '',
        location: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        propertyType: '',
        image: '',
        nearby: '',
      });
    } catch (error) {
      console.error('Error posting property:', error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add a New Property</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Property Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            type="text"
            id="name"
            name="name"
            value={propertyData.name}
            onChange={handleChange}
            placeholder="Enter property name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Location
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            type="text"
            id="location"
            name="location"
            value={propertyData.location}
            onChange={handleChange}
            placeholder="Enter location"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            type="text"
            id="price"
            name="price"
            value={propertyData.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bedrooms">
            Number of Bedrooms
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={propertyData.bedrooms}
            onChange={handleChange}
            placeholder="Enter number of bedrooms"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bathrooms">
            Number of Bathrooms
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={propertyData.bathrooms}
            onChange={handleChange}
            placeholder="Enter number of bathrooms"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="propertyType">
            Property Type
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            id="propertyType"
            name="propertyType"
            value={propertyData.propertyType}
            onChange={handleChange}
          >
            <option value="">Select Property Type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            {/* Add more property types */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image
          </label>
          <input
            className="hidden"
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
          <label
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 cursor-pointer transition duration-200"
            htmlFor="image"
          >
            Upload Image
          </label>
          {propertyData.image && (
            <img src={propertyData.image} alt="Property" className="mt-2 w-full rounded-lg" />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nearby">
            Hospitals & Colleges Nearby
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            type="text"
            id="nearby"
            name="nearby"
            value={propertyData.nearby}
            onChange={handleChange}
            placeholder="Enter nearby hospitals & colleges"
          />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          type="submit"
        >
          Post Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
