import React, { useState } from 'react';
import Image from 'next/image'; // Asegúrate de importar Image
import ViewDishes from '../viewDishes/viewDishes';
import ViewReviews from '../viewReviews/viewReviews';
import ViewUsers from '../viewUsers/viewUsers';
import AdminPerfil from '../adminPerfil/adminPerfil';
import ViewOrders from '../viewOrders/viewOrders';
import ViewReserves from '../viewReserves/viewReserves';

const DashboardAdmindv = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('');

  const toggleAside = () => {
    setIsOpen(!isOpen);
  };

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
    setIsOpen(false);
  };

  return (
    <div className=" flex flex-row-reverse items-center h-screen">
       <button 
        onClick={toggleAside} 
        className={`h-full bg-secondary flex items-start p-2 ${!isOpen && "bg-transparent"}`}
      >
        <Image 
          src={isOpen ? "/assets/icon/back.png" : "/assets/icon/menu.png"} 
          alt={isOpen ? "Close Menu" : "Open Menu"} 
          width={24} 
          height={24} 
        />
      </button>

      {isOpen && (
        <nav className="w-1/5 h-full bg-secondary p-5">
          <ul className="space-y-4">
            <li>
              <button
                className={`w-full text-left px-4 py-2 text-white rounded-lg transition ${
                  selectedSection === 'adminPerfil' ? 'bg-yellow-600' : 'bg-yellow-700 hover:bg-yellow-600'
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
            <li>
              <button
                className={`w-full text-left px-4 py-2 text-white rounded-lg transition ${
                  selectedSection === 'viewOrders' ? 'bg-yellow-600' : 'bg-yellow-700 hover:bg-yellow-600'
                }`}
                onClick={() => handleSectionChange('viewOrders')}
              >
                Orders
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 text-white rounded-lg transition ${
                  selectedSection === 'viewReserves' ? 'bg-yellow-600' : 'bg-yellow-700 hover:bg-yellow-600'
                }`}
                onClick={() => handleSectionChange('viewReserves')}
              >
                Reserves
              </button>
            </li>
          </ul>
        </nav>
      )}

      {/* Content */}
      <div className="flex-1 p-10">
        {selectedSection === 'adminPerfil' && <AdminPerfil />}
        {selectedSection === 'viewUser' && <ViewUsers />}
        {selectedSection === 'viewDishes' && <ViewDishes />}
        {selectedSection === 'viewReviews' && <ViewReviews />}
        {selectedSection === 'viewOrders' && <ViewOrders />}
        {selectedSection === 'viewReserves' && <ViewReserves />}
        {!selectedSection && (
          <p className="text-gray-600">Select an option from the menu to get started!</p>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmindv;
