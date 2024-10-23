import React, { useState } from 'react';
import ViewDishes from '../viewDishes/viewDishes';
import ViewReviews from '../viewReviews/viewReviews';
import ViewUsers from '../viewUsers/viewUsers';
import AdminPerfil from '../adminPerfil/adminPerfil';

const DashboardAdmindv = (): JSX.Element => {
  const [selectedSection, setSelectedSection] = useState('');


  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
  };

  return (
    <div className="flex flex-row-reverse h-screen"> 
      <nav className="w-1/5 bg-red-700 p-5">
        <ul className="space-y-4">
          <li>
            <button 
              className={`w-full text-left px-4 py-2 text-white rounded-lg transition ${
                selectedSection === 'adminPerfil' ? 'bg-yellow-600' : 'bg-yellow-900 hover:bg-yellow-600'
              }`}
              onClick={() => handleSectionChange('adminPerfil')}
            >
              Profile
            </button>
          </li>
          <li>
            <button 
              className={`w-full text-left px-4 py-2 text-white rounded-lg transition ${
                selectedSection === 'viewUser' ? 'bg-yellow-600' : 'bg-yellow-700 hover:bg-yellow-600'
              }`}
              onClick={() => handleSectionChange('viewUser')}
            >
              Users
            </button>
          </li>
          <li>
            <button 
              className={`w-full text-left px-4 py-2 text-white rounded-lg transition ${
                selectedSection === 'viewDishes' ? 'bg-yellow-600' : 'bg-yellow-700 hover:bg-yellow-600'
              }`}
              onClick={() => handleSectionChange('viewDishes')}
            >
              Dishes
            </button>
          </li>
          <li>
            <button 
              className={`w-full text-left px-4 py-2 text-white rounded-lg transition ${
                selectedSection === 'viewReviews' ? 'bg-yellow-600' : 'bg-yellow-700 hover:bg-yellow-600'
              }`}
              onClick={() => handleSectionChange('viewReviews')}
            >
              Reviews
            </button>
          </li>
        </ul>
      </nav>

      {/* Content */}
      <div className="flex-1 p-10 bg-gray-100">
        {selectedSection === 'adminPerfil' && <AdminPerfil />}
        {selectedSection === 'viewUser' && <ViewUsers />}
        {selectedSection === 'viewDishes' && <ViewDishes />}
        {selectedSection === 'viewReviews' && <ViewReviews />}
        {!selectedSection && (
          <p className="text-gray-600">Select an option from the sidebar to get started!</p>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmindv;
