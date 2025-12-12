import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Calendar } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contacto" className="section-padding relative">
      <div className="container mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="h-px w-8 bg-primary mr-4"></div>
            <span className="text-neutral-300 uppercase tracking-wider text-sm font-medium">
              Contáctanos
            </span>
            <div className="h-px w-8 bg-primary ml-4"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            ¿Listo para <span className="gradient-text">transformar</span> tu negocio?
          </h2>
          
          <p className="text-neutral-300 text-lg">
            Cuéntanos sobre tu proyecto y descubre cómo podemos ayudarte a alcanzar 
            tus objetivos tecnológicos y de negocio
          </p>
        </motion.div>
        
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="p-8 bg-background-light/70 backdrop-blur-md rounded-xl border border-neutral-700/50 mb-8">
              <h3 className="text-2xl font-display font-bold mb-6 gradient-text">
                Información de contacto
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center mr-4 text-primary">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Teléfono</h4>
                    <p className="text-neutral-300">+57 3025940259</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center mr-4 text-primary">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Email</h4>
                    <p className="text-neutral-300">gerencia@softdatai.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center mr-4 text-primary">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Ubicación</h4>
                    <p className="text-neutral-300">Bogotá, Colombia</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 bg-background-light/70 backdrop-blur-md rounded-xl border border-neutral-700/50">
              <div className="flex items-start mb-6">
                <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center mr-4 text-primary">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg mb-1">Agenda una reunión</h4>
                  <p className="text-neutral-300 mb-4">Programa una sesión de consultoría gratuita</p>
                </div>
              </div>
              
              <motion.a
                href="https://wa.me/573025940259"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary w-full flex items-center justify-center"
              >
                Agendar reunión
                <Calendar size={18} className="ml-2" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;