'use client';
// src/components/modify.js
import React, { useState } from 'react';

const ModifyProperty = ({ property, onSave, onCancel }) => {
  const [modifiedProperty, setModifiedProperty] = useState({ ...property });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedProperty({
      ...modifiedProperty,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(modifiedProperty);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Modify Property</h2>
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
            value={modifiedProperty.name}
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
            value={modifiedProperty.location}
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
            value={modifiedProperty.price}
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
            value={modifiedProperty.bedrooms}
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
            value={modifiedProperty.bathrooms}
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
            value={modifiedProperty.propertyType}
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nearby">
            Hospitals & Colleges Nearby
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            type="text"
            id="nearby"
            name="nearby"
            value={modifiedProperty.nearby}
            onChange={handleChange}
            placeholder="Enter nearby hospitals & colleges"
          />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 mr-2"
          type="submit"
        >
          Save
        </button>
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ModifyProperty;
