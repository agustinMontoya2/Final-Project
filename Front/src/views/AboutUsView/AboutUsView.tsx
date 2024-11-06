"use client"
import dynamic from 'next/dynamic';
// import 'leaflet/dist/leaflet.css';
import React, { createContext } from 'react';

const AboutUsView:React.FC = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center p-6">
            <h1 className="text-neutral-700 font-bold text-2xl mt-3">Welcome to Club Fellini - Bar</h1>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 m-auto my-3 text-neutral-600 md:p-10">
                    <p>
                        Located in the heart of Rosario, Santa Fe, Club Fellini is more than a bar; It is a space where good company and culture meet. Since our opening, we have been a meeting point for lovers of music, art and gastronomy, offering a welcoming and vibrant atmosphere that invites you to relax and enjoy.<br></br><br></br>
                        Our bar is designed to create memorable experiences. With a careful selection of cocktails, craft beers and a variety of dishes that fuse the classic and the innovative, each visit to Club Fellini is a celebration of the senses.<br></br><br></br>
                        Additionally, we pride ourselves on being an inclusive and diverse space, where everyone is welcome. Throughout the year, we organize cultural events, live music nights and exhibitions by local artists, fostering creativity and talent in our community.<br></br><br></br>
                        At Club Fellini, we believe in the power of human connection and the importance of enjoying every moment. We invite you to visit us and be part of our history, where every night is a new opportunity to create unforgettable memories.<br></br><br></br>
                        <b>We are waiting for you!</b>
                    </p>
                </div>
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center  md:p-10">
                    <h2 className="text-neutral-700 font-bold text-xl">Find us at:</h2>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.7924128143113!2d-60.64643652460837!3d-32.95648967238531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab0e50048a05%3A0xe7807dfd0c9e4c81!2sClub%20Fellini!5e0!3m2!1ses!2sar!4v1730324932848!5m2!1ses!2sar"
                        allowFullScreen
                        loading="lazy"
                        className='w-96 h-72 rounded-xl mt-3 border-4 m-auto'
                    ></iframe>
                </div>
            </div>
        </div>
    )
}

export default AboutUsView