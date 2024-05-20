// src/pages/ListingsPage.js
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import ListingCard from './ListingCard.js';
import PropertyModal from './PropertyModal';
import Filters from './Filters';
import Pagination from './Pagination';

const ListingsPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(6);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const { data } = await axios.get('/api/properties');
        setProperties(data.data);
        setFilteredProperties(data.data);
      } catch (error) {
        console.error('Error fetching properties:', error.response);
      }
    }
    fetchProperties();
  }, []);

  const handleSearch = (query) => {
    const filtered = properties.filter((property) =>
      property.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProperties(filtered);
    setCurrentPage(1);
  };

  const handleFilter = (filters) => {
    // Implement filter logic here
    // Example: setFilteredProperties(filteredPropertiesBasedOnFilters);
  };

  const handleLogout = () => {
    // Implement logout logic here
  };

  const handleCardClick = (property) => {
    setSelectedProperty(property);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onSearch={handleSearch} onLogout={handleLogout} />
      <div className="container mx-auto px-4 py-6">
        <Filters onFilter={handleFilter} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProperties.map((property) => (
            <ListingCard key={property._id} property={property} onClick={() => handleCardClick(property)} />
          ))}
        </div>
        <Pagination
          totalProperties={filteredProperties.length}
          propertiesPerPage={propertiesPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
      {selectedProperty && (
        <PropertyModal property={selectedProperty} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ListingsPage;
