import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background-dark/90 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center">
              <img 
                src="/images/LOGO SOFDATAI BLANCO WEB CURVA.png" 
                alt="SOFTDATAI Logo" 
                className="h-20 md:h-30 lg:h-35" 
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8"
          >
            {/* Inicio link removed - logo now serves as home link */}
            <a
              href="/#servicios"
              className="text-neutral-200 hover:text-white transition-colors text-sm lg:text-base"
            >
              Servicios
            </a>
            <a
              href="/#sectores"
              className="text-neutral-200 hover:text-white transition-colors text-sm lg:text-base"
            >
              Sectores
            </a>
            <a
              href="/#nosotros"
              className="text-neutral-200 hover:text-white transition-colors text-sm lg:text-base"
            >
              Nosotros
            </a>
            <a
              href="/#contacto"
              className="text-neutral-200 hover:text-white transition-colors text-sm lg:text-base"
            >
              Contacto
            </a>
          </motion.nav>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden md:block"
          >
            <a 
              href="https://wa.me/573025940259" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3"
            >
              Solicitar Asesoría
            </a>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:hidden"
          >
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <Menu size={24} className="text-white" />
              )}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: mobileMenuOpen ? 'auto' : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-background-light/90 backdrop-blur-lg"
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          {/* Inicio link removed - logo now serves as home link */}
          <a
            href="/#servicios"
            className="text-neutral-200 hover:text-white transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Servicios
          </a>
          <a
            href="/#sectores"
            className="text-neutral-200 hover:text-white transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sectores
          </a>
          <a
            href="/#nosotros"
            className="text-neutral-200 hover:text-white transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Nosotros
          </a>
          <a
            href="/#contacto"
            className="text-neutral-200 hover:text-white transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contacto
          </a>
          <a
            href="https://wa.me/573025940259"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block text-center mt-2"
            onClick={toggleMobileMenu}
          >
            Solicitar Asesoría
          </a>
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;