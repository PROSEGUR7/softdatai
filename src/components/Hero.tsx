import React from 'react';
import { motion } from 'framer-motion';
import HeroStats from './HeroStats';

const Hero: React.FC = () => {
  return (
    <section 
      id="inicio" 
      className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-36 md:pb-32 overflow-hidden min-h-[90vh] sm:min-h-screen flex items-center"
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-primary mr-4"></div>
              <span className="text-neutral-300 uppercase tracking-wider text-sm font-medium">
                Tecnología de vanguardia
              </span>
              <div className="h-px w-12 bg-primary ml-4"></div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6 leading-tight">
              Impulsa tu empresa con{' '}
              <span className="gradient-text">tecnología</span> y{' '}
              <span className="accent-gradient-text">datos inteligentes</span>
            </h1>
            
            <p className="text-base sm:text-lg text-neutral-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
              SOFTDATAI moderniza tu negocio con soluciones tecnológicas basadas en 
              datos, IA y transformación digital
            </p>
            
            <div className="flex justify-center">
              <motion.a
                href="#contacto"
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Solicita una asesoría
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 sm:mt-16 md:mt-24 w-full px-2 sm:px-0"
          >
            <HeroStats />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;