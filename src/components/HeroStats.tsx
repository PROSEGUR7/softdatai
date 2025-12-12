import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Code2, Award } from 'lucide-react';

interface StatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

const Stat: React.FC<StatProps> = ({ icon, value, label, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center md:items-start"
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
        <div className="text-primary">{icon}</div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold">{value}</h3>
      </div>
      <p className="text-neutral-400 text-xs sm:text-sm md:text-base text-center md:text-left">{label}</p>
    </motion.div>
  );
};

const HeroStats: React.FC = () => {
  return (
    <div className="card-highlight p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        <Stat
          icon={<BarChart3 size={24} />}
          value="+95%"
          label="Tasa de éxito en proyectos"
          delay={0.1}
        />
        <Stat
          icon={<Code2 size={24} />}
          value="+50"
          label="Soluciones implementadas"
          delay={0.2}
        />
        <Stat
          icon={<Award size={24} />}
          value="+8"
          label="Años de experiencia"
          delay={0.3}
        />
      </div>
    </div>
  );
};

export default HeroStats;