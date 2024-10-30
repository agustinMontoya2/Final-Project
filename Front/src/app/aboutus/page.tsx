import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import React, { createContext } from 'react';

const AboutUs = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center p-6">
            <h1 className="text-neutral-700 font-bold text-2xl">Welcome to Club Fellini - Bar</h1>
            <div className="flex flex-wrap">
                <div className="w-1/2 text-neutral-600 p-10">
                    <p>
                        Ubicado en el corazón de Rosario, Santa Fe, Club Fellini es más que un bar; es un espacio donde la buena compañía y la cultura se encuentran. Desde nuestra apertura, hemos sido un punto de encuentro para amantes de la música, el arte y la gastronomía, ofreciendo un ambiente acogedor y vibrante que invita a relajarse y disfrutar.<br></br><br></br>
                        Nuestro bar está diseñado para crear experiencias memorables. Con una cuidada selección de cócteles, cervezas artesanales y una variedad de platos que fusionan lo clásico y lo innovador, cada visita a Club Fellini es una celebración de los sentidos.<br></br><br></br>
                        Además, nos enorgullece ser un espacio inclusivo y diverso, donde todos son bienvenidos. A lo largo del año, organizamos eventos culturales, noches de música en vivo y exposiciones de artistas locales, fomentando así la creatividad y el talento de nuestra comunidad.<br></br><br></br>
                        En Club Fellini, creemos en el poder de la conexión humana y la importancia de disfrutar cada momento. Te invitamos a visitarnos y ser parte de nuestra historia, donde cada noche es una nueva oportunidad para crear recuerdos inolvidables.<br></br><br></br>
                        <b>¡Te esperamos!</b>
                    </p>
                </div>
                <div className="w-1/2 flex flex-col items-center  p-10">
                    <h2 className="text-neutral-700 font-bold text-xl">Find us at:</h2>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.7924128143113!2d-60.64643652460837!3d-32.95648967238531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab0e50048a05%3A0xe7807dfd0c9e4c81!2sClub%20Fellini!5e0!3m2!1ses!2sar!4v1730324932848!5m2!1ses!2sar"
                        width="550"
                        height="400"
                        allowFullScreen
                        loading="lazy"
                        className='rounded-xl mt-3 border-4'
                    ></iframe>
                </div>
            </div>
        </div>
    )
}

export default  AboutUs;
