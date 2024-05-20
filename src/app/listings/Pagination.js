// src/components/Pagination.js
'use client';
import React from 'react';

const Pagination = ({ totalProperties, propertiesPerPage, currentPage, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProperties / propertiesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-6">
      <nav>
        <ul className="flex list-none">
          {pageNumbers.map(number => (
            <li key={number} className="mx-1">
              <button
                onClick={() => onPageChange(number)}
                className={`py-2 px-4 rounded-lg ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'} hover:bg-blue-500 hover:text-white transition duration-200`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
