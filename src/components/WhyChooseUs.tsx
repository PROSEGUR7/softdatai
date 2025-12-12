import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Users, Target, ArrowUpRight } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="card-glow group"
    >
      <div className="flex items-start p-6 rounded-xl bg-background-light/70 backdrop-blur-sm border border-neutral-700/50 group-hover:border-primary/30 transition-all duration-300 h-full">
        <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mr-4 text-primary">
          {icon}
        </div>
        
        <div>
          <h3 className="text-xl font-display font-semibold mb-2">{title}</h3>
          <p className="text-neutral-300 text-sm">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Lightbulb size={24} />,
      title: "Equipo experto en innovación",
      description: "Nuestro equipo está formado por profesionales con amplia experiencia en las últimas tecnologías y metodologías de innovación"
    },
    {
      icon: <Users size={24} />,
      title: "Atención personalizada",
      description: "Trabajamos estrechamente con cada cliente para entender sus necesidades específicas y ofrecer soluciones a medida"
    },
    {
      icon: <Target size={24} />,
      title: "Soluciones a medida",
      description: "Desarrollamos soluciones que se adaptan perfectamente a tus procesos y objetivos de negocio"
    },
    {
      icon: <ArrowUpRight size={24} />,
      title: "Enfoque en escalabilidad",
      description: "Diseñamos sistemas que pueden crecer con tu negocio, asegurando que las soluciones sean viables a largo plazo"
    }
  ];

  return (
    <section className="section-padding relative">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center mb-4">
              <div className="h-px w-12 bg-primary mr-4"></div>
              <span className="text-neutral-300 uppercase tracking-wider text-sm font-medium">
                Por qué elegirnos
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight">
              La elección <span className="gradient-text">estratégica</span> para tu transformación digital
            </h2>
            
            <p className="text-neutral-300 text-lg">
              En SOFTDATAI combinamos expertise técnico con una profunda comprensión de los 
              desafíos empresariales para ofrecer soluciones que realmente impulsan resultados
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:col-span-3">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-20 -left-64 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default WhyChooseUs;