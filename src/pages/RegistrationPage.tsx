import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import ParticleBackground from '../components/ParticleBackground';
import CursorSpotlight from '../components/CursorSpotlight';
import { Link } from 'react-router-dom';

const RegistrationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-dark overflow-hidden relative">
      <ParticleBackground />
      <CursorSpotlight />
      
      {/* Header simple con solo el logo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-start h-24">
            <Link to="/" className="flex items-center">
              <img 
                src="/images/LOGO SOFDATAI BLANCO WEB CURVA.png" 
                alt="Logo de Softdatai"
                className="h-20 md:h-30 lg:h-35" 
              />
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex items-center justify-center relative z-10 pt-24">
        <div className="w-full max-w-md px-4">
          <RegistrationForm />
        </div>
      </main>
      
      <footer className="py-4 px-4 text-center text-sm text-neutral-400 relative z-10">
        <p>&copy; {new Date().getFullYear()} SOFTDATAI. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default RegistrationPage;
