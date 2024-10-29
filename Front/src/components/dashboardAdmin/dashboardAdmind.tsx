import React, { useState } from 'react';
import Image from 'next/image'; // Asegúrate de importar Image
import ViewDishes from '../viewDishes/viewDishes';
import ViewReviews from '../viewReviews/viewReviews';
import ViewUsers from '../viewUsers/viewUsers';
import AdminPerfil from '../adminPerfil/adminPerfil';
import Link from 'next/link';

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
      {
        !isOpen ? (
          <button
            onClick={toggleAside}
            className={`h-10 bg-secondary flex items-start p-2 ${!isOpen && "bg-transparent"}`}
          >
            <Image
              src={"/assets/icon/menu.png"}
              alt={"Open Menu"}
              width={35}
              height={35}
            />
          </button>
        ) : (
          <div className='w-[51px]'></div>
        )
      }

      {isOpen && (
        <div className={`h-screen absolute top-9 -right-12 w-56 transition-all duration-300 ease-in-out p-5 py-28 bg-secondary`}>
          <button
            onClick={toggleAside}
            className={`h-10 absolute top-1 right-1 bg-secondary flex items-start p-2 ${!isOpen && "bg-transparent"}`}
          >
            <Image
            src={"/assets/icon/cross.png"}
            alt={"Close Menu"}
            width={20}
            height={20}
            />
          </button>
          <div className="w-full flex justify-center flex-col items-center space-y-5">
              <Link href={'/admin/profileAdmin'}
                onClick={handleClick}
                className={`w-full text-left px-4 py-2 text-white rounded-lg transition ${selectedSection === 'adminPerfil' ? 'bg-neutral-600' : 'bg-neutral-500 hover:bg-neutral-600'}`}
              >
                Profile
              </Link >
              <Link href={'/admin/users'}
                onClick={handleClick}
                className={`w-full text-left  px-4 py-2 text-white rounded-lg transition ${selectedSection === 'viewUser' ? 'bg-neutral-600' : 'bg-neutral-500 hover:bg-neutral-600'}`}
              >
                Users
              </Link >
              <Link href={'/admin/dishes'}
                onClick={handleClick}
                className={`w-full text-left px-4 py-2 text-white rounded-lg transition ${selectedSection === 'viewDishes' ? 'bg-neutral-600' : 'bg-neutral-500 hover:bg-neutral-600'}`}
              >
                Dishes
              </Link >
              <Link href={'/admin/reviews'}
                onClick={handleClick}
                className={`w-full text-left px-4 py-2 text-white rounded-lg transition ${selectedSection === 'viewReviews' ? 'bg-neutral-600' : 'bg-neutral-500 hover:bg-neutral-600'}`}
              >
                Reviews
              </Link >
              <Link href={'/admin/orders'}
                onClick={handleClick}
                className={`w-full text-left px-4 py-2 text-white rounded-lg transition ${selectedSection === 'viewReviews' ? 'bg-neutral-600' : 'bg-neutral-500 hover:bg-neutral-600'}`}
              >
                Orders
              </Link >
          </div>
        </div>
      )}

      {/* Contenido */}
      <div className={``}>
        {selectedSection === 'adminPerfil' && <AdminPerfil />}
        {selectedSection === 'viewUser' && <ViewUsers />}
        {selectedSection === 'viewDishes' && <ViewDishes />}
        {selectedSection === 'viewReviews' && <ViewReviews />}
      </div>
    </div>
  );
};

export default DashboardAdmindv;
