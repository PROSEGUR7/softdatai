import React from 'react';
import { motion } from 'framer-motion';
import { Database, CloudCog, BrainCircuit, Code } from 'lucide-react';

const AboutCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="card-glow"
    >
      <div className="p-6 rounded-xl bg-background-light/70 backdrop-blur-sm border border-neutral-700/50 hover:border-primary/30 transition-all duration-300">
        <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-display font-medium mb-3">{title}</h3>
        <p className="text-neutral-300">{description}</p>
      </div>
    </motion.div>
  );
};

const About: React.FC = () => {
  const features = [
    {
      icon: <CloudCog size={24} />,
      title: "Migración a la nube",
      description: "Facilitamos la transición segura y eficiente de tus sistemas a plataformas cloud como Azure y Google Cloud"
    },
    {
      icon: <Code size={24} />,
      title: "Desarrollo a medida",
      description: "Creamos software personalizado que se adapta perfectamente a los procesos únicos de tu empresa"
    },
    {
      icon: <Database size={24} />,
      title: "Gestión de datos",
      description: "Optimizamos tus bases de datos para mejorar el rendimiento y proteger tu información más valiosa"
    },
    {
      icon: <BrainCircuit size={24} />,
      title: "Soluciones con IA",
      description: "Implementamos inteligencia artificial para automatizar procesos y obtener insights valiosos de tus datos"
    }
  ];

  return (
    <section id="nosotros" className="section-padding relative">
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
              ¿Quiénes Somos?
            </span>
            <div className="h-px w-8 bg-primary ml-4"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Transformamos negocios con <span className="gradient-text">soluciones tecnológicas</span>
          </h2>
          
          <p className="text-neutral-300 text-lg">
            SOFTDATAI es una consultora especializada en modernización tecnológica, migración a la nube, 
            ciencia de datos y desarrollo de software a medida. Nuestro enfoque se centra en potenciar tu empresa 
            a través de la innovación tecnológica y la optimización de procesos
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <AboutCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-40 -left-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default About;