'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBed, FaBath, FaRegBuilding, FaTrashAlt, FaEdit } from 'react-icons/fa';
import ModifyProperty from './modify';

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [selectedModifyProperty, setSelectedModifyProperty] = useState(null);
  const [isModifyOpen, setIsModifyOpen] = useState(false);

  useEffect(() => {
    async function fetchProperties() {
      const token = localStorage.getItem('token');
      try {
        const { data } = await axios.get('/api/properties', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProperties(data.data);
      } catch (error) {
        console.error('Error fetching properties:', error.response);
        // You can handle the error here, like showing a message to the user
      }
    }
  
    fetchProperties();
  }, []);

  const deleteProperty = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/api/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProperties(properties.filter(property => property._id !== id));
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const sortProperties = (key) => {
    const sortedProperties = [...properties].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    setProperties(sortedProperties);
  };

  const openModify = (property) => {
    setSelectedModifyProperty(property);
    setIsModifyOpen(true);
  };

  const closeModify = () => {
    setIsModifyOpen(false);
  };

  const saveModify = async (modifiedProperty) => {
    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.put(`/api/properties/${modifiedProperty._id}`, modifiedProperty, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProperties(properties.map(property => (property._id === data.data._id ? data.data : property)));
      setIsModifyOpen(false);
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">My Properties</h2>
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">Sort By:</span>
          <button
            className="text-blue-500 hover:text-blue-700 mr-2"
            onClick={() => sortProperties('name')}
          >
            Name
          </button>
          <button
            className="text-blue-500 hover:text-blue-700 mr-2"
            onClick={() => sortProperties('area')}
          >
            Area
          </button>
          <button
            className="text-blue-500 hover:text-blue-700 mr-2"
            onClick={() => sortProperties('price')}
          >
            Price
          </button>
          {/* Add more sorting options if needed */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map(property => (
          <div key={property._id} className="bg-white shadow rounded-lg overflow-hidden relative">
            <img src={property.image} alt={property.name} className="w-full h-64 object-cover" />
            <span className="bg-blue-500 text-white px-2 py-1 absolute top-0 left-0 rounded-br-lg text-xs font-semibold">{property.propertyType}</span>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{property.name}</h3>
              <p className="text-gray-600">Location: {property.location}</p>
              <p className="text-gray-600">Price: {property.price}</p>
              <p className="text-gray-600">Area: {property.area}</p>
              <div className="flex items-center text-gray-600">
                <FaBed className="mr-1" /> {property.bedrooms} <span className="mx-2">|</span> <FaBath className="mr-1" /> {property.bathrooms}
              </div>
              <div className="flex items-center text-gray-600">
                <FaRegBuilding className="mr-1" /> {property.propertyType}
              </div>
              <p className="text-gray-600">Nearby: {property.nearby}</p>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <button
                    className="text-red-500 hover:text-red-700 mr-2"
                    onClick={() => deleteProperty(property._id)}
                  >
                    <FaTrashAlt />
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => openModify(property)}
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modify Property Popup */}
      {isModifyOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <ModifyProperty
            property={selectedModifyProperty}
            onSave={saveModify}
            onCancel={closeModify}
          />
        </div>
      )}
    </div>
  );
};

export default MyProperties;
