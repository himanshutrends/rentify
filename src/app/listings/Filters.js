// src/components/Filters.js
'use client';
import React, { useState } from 'react';

const Filters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    propertyType: '',
    priceRange: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilter = () => {
    onFilter(filters);
  };

  return (
    <div className="mb-6">
      <h4 className="text-xl font-bold mb-4">Filters</h4>
      <div className="flex flex-wrap -mx-2">
        <div className="px-2 mb-4 w-1/2 md:w-1/4">
          <label className="block text-gray-600 mb-2">Property Type</label>
          <select
            name="propertyType"
            className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"
            onChange={handleChange}
          >
            <option value="">All</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
          </select>
        </div>
        <div className="px-2 mb-4 w-1/2 md:w-1/4">
          <label className="block text-gray-600 mb-2">Price Range</label>
          <select
            name="priceRange"
            className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"
            onChange={handleChange}
          >
            <option value="">All</option>
            <option value="0-1000">$0 - $1000</option>
            <option value="1000-2000">$1000 - $2000</option>
            <option value="2000-3000">$2000 - $3000</option>
          </select>
        </div>
        <div className="px-2 mb-4 w-full md:w-auto">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 mt-6"
            onClick={handleFilter}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
