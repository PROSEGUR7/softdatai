import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Layers, LineChart, Database, BrainCircuit, Zap } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  benefits,
  index,
  isActive,
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className={`relative cursor-pointer transition-all duration-300 p-0.5 rounded-xl bg-gradient-to-br from-primary/30 via-primary/10 to-transparent ${
        isActive ? 'scale-[1.02]' : 'hover:scale-[1.01]'
      }`}
      onClick={onClick}
    >
      <div className="bg-background rounded-xl p-4 sm:p-6 h-full">
        <div className="flex items-start">
          <div className="rounded-lg p-2 sm:p-3 mr-3 sm:mr-4 bg-primary/20">
            <div className="text-primary">
              {icon}
            </div>
          </div>
          
          <div className="flex flex-col h-full">
            <h3 className="text-lg sm:text-xl font-display font-semibold mb-1 sm:mb-2">{title}</h3>
            <p className="text-neutral-400 text-sm sm:text-base mb-3 sm:mb-4">{description}</p>
            
            <div className="mt-auto">
              <h4 className="text-xs sm:text-sm font-medium text-primary mb-1 sm:mb-2">Beneficios</h4>
              <ul className="space-y-1 sm:space-y-2">
                {benefits.slice(0, 4).map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-secondary mr-1 sm:mr-2">✓</span>
                    <span className="text-neutral-300 text-xs sm:text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState(0);
  
  const services = [
    {
      icon: <Cloud size={24} />,
      title: "Migración a la nube",
      description: "Trasladamos y optimizamos tus sistemas en plataformas cloud como Azure y Google Cloud",
      benefits: [
        "Reducción de costos de infraestructura",
        "Mayor seguridad y cumplimiento normativo",
        "Escalabilidad según demanda",
        "Acceso remoto seguro a todos tus sistemas"
      ]
    },
    {
      icon: <Layers size={24} />,
      title: "Modernización de plataformas",
      description: "Actualizamos tus aplicaciones legacy a arquitecturas modernas y eficientes",
      benefits: [
        "Mejora del rendimiento y la experiencia de usuario",
        "Integración con sistemas y APIs modernas",
        "Adaptación a dispositivos móviles",
        "Reducción de deuda técnica"
      ]
    },
    {
      icon: <LineChart size={24} />,
      title: "Análisis y visualización de datos",
      description: "Transformamos tus datos en insights accionables con dashboards interactivos",
      benefits: [
        "Toma de decisiones basada en datos",
        "Identificación de tendencias y patrones",
        "Monitoreo en tiempo real",
        "Informes personalizados y automáticos"
      ]
    },
    {
      icon: <Database size={24} />,
      title: "Optimización de bases de datos",
      description: "Mejoramos el rendimiento y la seguridad de tus bases de datos empresariales",
      benefits: [
        "Mayor velocidad en las consultas",
        "Reducción de la latencia",
        "Mejora en la integridad de datos",
        "Estrategias de backup y recuperación eficientes"
      ]
    },
    {
      icon: <BrainCircuit size={24} />,
      title: "Soluciones con IA y machine learning",
      description: "Implementamos inteligencia artificial para automatizar procesos y generar predicciones",
      benefits: [
        "Automatización de tareas repetitivas",
        "Detección de anomalías y fraudes",
        "Sistemas de recomendación personalizados",
        "Predicción de comportamientos y tendencias"
      ]
    },
    {
      icon: <Zap size={24} />,
      title: "Automatización de Procesos",
      description: "Implementamos soluciones de automatización avanzada con n8n y chatbots para optimizar la atención al cliente y procesos internos",
      benefits: [
        "Chatbots inteligentes 24/7 para atención al cliente",
        "Automatización de flujos de trabajo complejos",
        "Integración con WhatsApp, Messenger y más",
        "Análisis de conversaciones para mejora continua"
      ]
    }
  ];

  return (
    <section id="servicios" className="section-padding relative">
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
              Nuestros Servicios
            </span>
            <div className="h-px w-8 bg-primary ml-4"></div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 sm:mb-6">
            Soluciones <span className="gradient-text">tecnológicas</span> para impulsar tu negocio
          </h2>
          
          <p className="text-neutral-300 text-base sm:text-lg px-4 sm:px-0">
            Ofrecemos un conjunto completo de servicios diseñados para transformar digitalmente tu 
            organización, optimizar procesos y maximizar el valor de tus datos
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              benefits={service.benefits}
              index={index}
              isActive={activeService === index}
              onClick={() => setActiveService(index)}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a href="#contacto" className="btn-primary">
            Consulta sobre nuestros servicios
          </a>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-20 -right-64 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default Services;