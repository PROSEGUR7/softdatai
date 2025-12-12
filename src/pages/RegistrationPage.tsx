import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import ParticleBackground from '../components/ParticleBackground';
import CursorSpotlight from '../components/CursorSpotlight';
import { Link } from 'react-router-dom';

const RegistrationPage: React.FC = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-white flex flex-col">
      <ParticleBackground />
      <CursorSpotlight />
      
      <header className="py-4 px-4 relative z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/images/LOGO SOFDATAI BLANCO WEB CURVA.png" 
              alt="SOFTDATAI Logo" 
              className="h-14" 
            />
          </Link>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center relative z-10">
        <div className="w-full max-w-md px-4">
          <RegistrationForm />
        </div>
      </main>
      
      <footer className="py-3 px-4 text-center text-sm text-neutral-400 relative z-10">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} SOFTDATAI. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default RegistrationPage;
