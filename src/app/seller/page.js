'use client';

import { useState } from 'react';
import AddProperty from './addproperty';
import MyProperties from './myproperties';
import Profile from './profile';

export default function Pages() {
  const [currentPage, setCurrentPage] = useState('AddProperty');

  const renderPage = () => {
    switch (currentPage) {
      case 'MyProperties':
        return <MyProperties />;
      case 'Profile':
        return <Profile />;
      default:
        return <AddProperty />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside className="flex-shrink-0 w-64 bg-white shadow h-full overflow-y-auto">
        <div className="py-4 px-6">
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
          <ul className="mt-6">
            <li className="mb-4">
              <button
                className={`flex items-center text-gray-600 hover:text-blue-600 ${currentPage === 'AddProperty' ? 'font-bold' : ''}`}
                onClick={() => setCurrentPage('AddProperty')}
              >
                <span className="text-lg mr-2">+</span>
                <span>Add Property</span>
              </button>
            </li>
            <li className="mb-4">
              <button
                className={`flex items-center text-gray-600 hover:text-blue-600 ${currentPage === 'MyProperties' ? 'font-bold' : ''}`}
                onClick={() => setCurrentPage('MyProperties')}
              >
                <span className="text-lg mr-2">🏠</span>
                <span>My Properties</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center text-gray-600 hover:text-blue-600 ${currentPage === 'Profile' ? 'font-bold' : ''}`}
                onClick={() => setCurrentPage('Profile')}
              >
                <span className="text-lg mr-2">👤</span>
                <span>Profile</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
}
