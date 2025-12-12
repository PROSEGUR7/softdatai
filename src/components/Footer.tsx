import React from 'react';
import { Facebook, Instagram, MessageCircle, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background-dark border-t border-neutral-800/50 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <Link to="/" className="flex items-center">
                <img 
                  src="/images/LOGO SOFDATAI BLANCO WEB CURVA.png" 
                  alt="SOFTDATAI Logo" 
                  className="h-20" 
                />
              </Link>
            </div>
            
            <p className="text-neutral-400 mb-6">
              SOFTDATAI: Consultoría tecnológica, migración a la nube, inteligencia artificial, desarrollo de software, análisis de datos y automatización para empresas. Modernizamos tu negocio con innovación y transformación digital.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61576877966498" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300 hover:bg-primary/20 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://www.instagram.com/softdatai?igsh=MXQ1cDhodDlla2h1YQ==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300 hover:bg-primary/20 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://wa.me/573025940259" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300 hover:bg-primary/20 hover:text-primary transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a 
                href="https://www.tiktok.com/@softdatai?_t=ZS-8wiIhihHbCa&_r=1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300 hover:bg-primary/20 hover:text-primary transition-colors"
                aria-label="TikTok"
              >
                <Music size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-6">Servicios</h3>
            <ul className="space-y-3">
              <li>
                <a href="#servicios" className="text-neutral-400 hover:text-primary transition-colors">
                  Migración a la nube
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-neutral-400 hover:text-primary transition-colors">
                  Modernización de plataformas
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-neutral-400 hover:text-primary transition-colors">
                  Análisis de datos
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-neutral-400 hover:text-primary transition-colors">
                  Optimización de bases de datos
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-neutral-400 hover:text-primary transition-colors">
                  Soluciones con IA
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-6">Sectores</h3>
            <ul className="space-y-3">
              <li>
                <a href="#sectores" className="text-neutral-400 hover:text-primary transition-colors">
                  Comercio
                </a>
              </li>
              <li>
                <a href="#sectores" className="text-neutral-400 hover:text-primary transition-colors">
                  Salud
                </a>
              </li>
              <li>
                <a href="#sectores" className="text-neutral-400 hover:text-primary transition-colors">
                  Finanzas
                </a>
              </li>
              <li>
                <a href="#sectores" className="text-neutral-400 hover:text-primary transition-colors">
                  Industria
                </a>
              </li>
              <li>
                <a href="#sectores" className="text-neutral-400 hover:text-primary transition-colors">
                  Educación
                </a>
              </li>
              <li>
                <a href="#sectores" className="text-neutral-400 hover:text-primary transition-colors">
                  Logística
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-6">Enlaces rápidos</h3>
            <ul className="space-y-3">
              <li>
                <a href="#inicio" className="text-neutral-400 hover:text-primary transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#nosotros" className="text-neutral-400 hover:text-primary transition-colors">
                  ¿Quiénes somos?
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-neutral-400 hover:text-primary transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#sectores" className="text-neutral-400 hover:text-primary transition-colors">
                  Sectores
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-neutral-400 hover:text-primary transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-800/50 text-center">
          <p className="text-neutral-500">
            &copy; {currentYear} SOFTDATAI. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;