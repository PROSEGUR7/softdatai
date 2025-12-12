import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Stethoscope, DollarSign, Factory, GraduationCap, Truck } from 'lucide-react';

interface SectorProps {
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const SectorItem: React.FC<SectorProps> = ({ icon, title, isActive, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all duration-300 ${
        isActive 
          ? 'bg-primary/20 border border-primary/30 shadow-neon-primary' 
          : 'bg-background-light/50 border border-neutral-700/50 hover:border-primary/20'
      }`}
    >
      <div className={`${isActive ? 'text-primary' : 'text-neutral-400'}`}>
        {icon}
      </div>
      <span className={`font-medium ${isActive ? 'text-white' : 'text-neutral-300'}`}>
        {title}
      </span>
    </motion.div>
  );
};

interface SectorContentProps {
  title: string;
  description: string;
  benefits: string[];
  solutions: string[];
}

const SectorContent: React.FC<SectorContentProps> = ({ title, description, benefits, solutions }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 md:p-8 bg-background-light/70 backdrop-blur-md rounded-xl border border-neutral-700/50"
    >
      <h3 className="text-2xl font-display font-bold mb-4 gradient-text">
        Sector {title}
      </h3>
      <p className="text-neutral-300 mb-6">{description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-medium text-white mb-3">Beneficios</h4>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="text-secondary mr-2">✓</span>
                <span className="text-neutral-300 text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-medium text-white mb-3">Soluciones</h4>
          <ul className="space-y-2">
            {solutions.map((solution, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span className="text-neutral-300 text-sm">{solution}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const Sectors: React.FC = () => {
  const [activeSector, setActiveSector] = useState(0);
  
  const sectors = [
    {
      icon: <ShoppingBag size={24} />,
      title: "Comercio",
      description: "Transformamos la experiencia de compra con soluciones digitales que optimizan la gestión de inventario, mejoran la experiencia del cliente y potencian las ventas.",
      benefits: [
        "Gestión eficiente de inventario",
        "Experiencias de compra personalizadas",
        "Análisis de comportamiento del consumidor",
        "Optimización de la cadena de suministro"
      ],
      solutions: [
        "Plataformas e-commerce a medida",
        "Sistemas de gestión de inventario en tiempo real",
        "Dashboards de análisis de ventas",
        "Integración con pasarelas de pago"
      ]
    },
    {
      icon: <Stethoscope size={24} />,
      title: "Salud",
      description: "Desarrollamos sistemas que mejoran la atención al paciente, optimizan la gestión de datos clínicos y facilitan la toma de decisiones basadas en evidencia.",
      benefits: [
        "Mayor seguridad en datos sensibles",
        "Mejora en la experiencia del paciente",
        "Optimización de procesos administrativos",
        "Soporte para telemedicina"
      ],
      solutions: [
        "Historias clínicas electrónicas",
        "Sistemas de agendamiento inteligente",
        "Análisis predictivo de tendencias médicas",
        "Plataformas de telemedicina"
      ]
    },
    {
      icon: <DollarSign size={24} />,
      title: "Finanzas",
      description: "Implementamos tecnologías seguras y eficientes para la gestión financiera, análisis de riesgos y detección de fraudes, cumpliendo con normativas del sector.",
      benefits: [
        "Detección y prevención de fraudes",
        "Cumplimiento normativo automatizado",
        "Análisis de riesgos avanzado",
        "Mejora en la toma de decisiones financieras"
      ],
      solutions: [
        "Sistemas de scoring crediticio con IA",
        "Plataformas de análisis de inversiones",
        "Automatización de procesos contables",
        "Monitoreo de transacciones en tiempo real"
      ]
    },
    {
      icon: <Factory size={24} />,
      title: "Industria",
      description: "Optimizamos los procesos industriales con soluciones de automatización, monitoreo en tiempo real y mantenimiento predictivo para maximizar la eficiencia.",
      benefits: [
        "Reducción de tiempos de inactividad",
        "Optimización de la producción",
        "Mantenimiento predictivo",
        "Mejora de la calidad del producto"
      ],
      solutions: [
        "Sistemas IoT para monitoreo de maquinaria",
        "Plataformas de gestión de producción",
        "Análisis predictivo para mantenimiento",
        "Automatización de procesos industriales"
      ]
    },
    {
      icon: <GraduationCap size={24} />,
      title: "Educación",
      description: "Creamos plataformas educativas innovadoras que facilitan el aprendizaje a distancia, la gestión académica y el seguimiento personalizado del desempeño estudiantil.",
      benefits: [
        "Personalización del aprendizaje",
        "Automatización de procesos administrativos",
        "Acceso a educación a distancia",
        "Análisis avanzado del rendimiento"
      ],
      solutions: [
        "Plataformas de e-learning interactivas",
        "Sistemas de gestión académica",
        "Herramientas de evaluación automática",
        "Análisis de progreso educativo"
      ]
    },
    {
      icon: <Truck size={24} />,
      title: "Logística",
      description: "Optimizamos la cadena de suministro con soluciones de trazabilidad, gestión de flotas y optimización de rutas para reducir costos y mejorar la eficiencia.",
      benefits: [
        "Optimización de rutas y entregas",
        "Trazabilidad completa de mercancías",
        "Reducción de costos operativos",
        "Gestión eficiente de inventarios"
      ],
      solutions: [
        "Sistemas de tracking en tiempo real",
        "Plataformas de gestión de flotas",
        "Optimización de rutas con IA",
        "Gestión digital de almacenes"
      ]
    }
  ];

  return (
    <section id="sectores" className="section-padding relative overflow-hidden">
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
              Sectores
            </span>
            <div className="h-px w-8 bg-primary ml-4"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Soluciones adaptadas a <span className="gradient-text">cada industria</span>
          </h2>
          
          <p className="text-neutral-300 text-lg">
            Entendemos los desafíos específicos de cada sector y ofrecemos soluciones 
            tecnológicas personalizadas para abordarlos de manera efectiva
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {sectors.map((sector, index) => (
            <SectorItem
              key={index}
              icon={sector.icon}
              title={sector.title}
              isActive={activeSector === index}
              onClick={() => setActiveSector(index)}
            />
          ))}
        </div>
        
        <SectorContent
          title={sectors[activeSector].title}
          description={sectors[activeSector].description}
          benefits={sectors[activeSector].benefits}
          solutions={sectors[activeSector].solutions}
        />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-40 -right-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default Sectors;