import React, { useState } from 'react';
import Image from 'next/image'; // Asegúrate de importar Image
import ViewDishes from '../viewDishes/viewDishes';
import ViewReviews from '../viewReviews/viewReviews';
import ViewUsers from '../viewUsers/viewUsers';
import AdminPerfil from '../adminPerfil/adminPerfil';
import Link from 'next/link';
import FormularioMenu from '../FormAddDish/FormAddDish';
import ViewReserves from '../viewReserves/viewReserves';
import ViewOrders from '../viewOrders/viewOrders';

const DashboardAdmindv = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('');

  const toggleAside = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    setIsOpen(false)
  }

  return (
    <div className={`h-full mb-3 relative flex flex-col items-center justify-center`}>
      <button
        onClick={toggleAside} 
        className={`h-10 bg-secondary flex items-start p-2 ${!isOpen && "bg-transparent"}`}
      >
        <Image 
          src={isOpen ? "/assets/icon/cross.png" : "/assets/icon/menu.png"} 
          alt={isOpen ? "Close Menu" : "Open Menu"} 
          width={35} 
          height={35} 
        />
      </button>

      {isOpen && (
        <div className={` absolute top-12 -right-12 w-56 transition-all duration-300 ease-in-out p-5 py-28 bg-secondary shadow-md`}>
          <div className="w-full flex justify-center flex-col items-center space-y-5">
              <Link href={'/admin/profileAdmin'}
                onClick={handleClick}
                className={`w-full text-left px-4 py-2 text-white rounded-lg transition ${selectedSection === 'adminPerfil' ? 'bg-yellow-600' : 'bg-yellow-700 hover:bg-yellow-600'}`}
              >
                Profile
              </Link >
              <Link href={'/admin/users'}
                onClick={handleClick}
                className={`w-full text-left  px-4 py-2 text-white rounded-lg transition ${selectedSection === 'viewUser' ? 'bg-yellow-600' : 'bg-yellow-700 hover:bg-yellow-600'}`}
              >
                Users
              </Link >
              <Link href={'/admin/dishes'}
                onClick={handleClick}
                className={`w-full text-left px-4 py-2 text-white rounded-lg transition ${selectedSection === 'viewDishes' ? 'bg-yellow-600' : 'bg-yellow-700 hover:bg-yellow-600'}`}
              >
                Dishes
              </Link >
              <Link href={'/admin/createDish'}
                onClick={handleClick}
                className={`w-full text-left px-4 py-2 text-white rounded-lg transition ${selectedSection === 'createDish' ? 'bg-yellow-600' : 'bg-yellow-700 hover:bg-yellow-600'}`}
              >
                add dishes
              </Link >
              <Link href={'/admin/reviews'}
                onClick={handleClick}
                className={`w-full text-left px-4 py-2 text-white rounded-lg transition ${selectedSection === 'reviews' ? 'bg-yellow-600' : 'bg-yellow-700 hover:bg-yellow-600'}`}
              >
                Reviews
              </Link >
              <Link href={'/admin/orders'}
              className={`w-full text-left px-4 py-2 text-white rounded-lg transition ${selectedSection === 'orders' ? 'bg-yellow-600' : 'bg-yellow-700 hover:bg-yellow-600'}`}
              >
              Orders
              </Link>
              <Link href={'/admin/reserves'}
              className={`w-full text-left px-4 py-2 text-white rounded-lg transition ${selectedSection === 'reserves' ? 'bg-yellow-600' : 'bg-yellow-700 hover:bg-yellow-600'}`}
              >
              Reserves
              </Link>
          </div>
        </div>
      )}

      {/* <div className={``}>
        {selectedSection === 'adminPerfil' && <AdminPerfil />}
        {selectedSection === 'viewUser' && <ViewUsers />}
        {selectedSection === 'viewDishes' && <ViewDishes />}
        {selectedSection === 'viewReviews' && <ViewReviews />}
        {selectedSection === 'FormularioMenu' && <}
        {selectedSection === 'viewOrders' && <}
        {selectedSection === 'viewReserves' && < }
      </div> */}
    </div>
  );
};

export default DashboardAdmindv;
