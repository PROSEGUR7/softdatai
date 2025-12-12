import React, { useEffect, useRef } from 'react';
import WompiPayment from './WompiPayment';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ProductCard debe estar definido antes de Products
interface ProductCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  price: string;
  accentColor: string;
  delay: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  icon,
  features,
  price,
  accentColor,
  delay
}) => {
  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-display font-bold mb-2">{title}</h3>
      <p className="text-neutral-300 text-sm mb-4">{description}</p>
      <div className="mt-auto">
        <div className="mb-4">
          <h4 className="text-sm font-medium text-neutral-200 mb-2">Características</h4>
          <ul className="space-y-2">
            {features.map((feature, i) => {
              // Get check mark color based on accentColor
              const getCheckClasses = () => {
                if (accentColor === "primary") return "text-primary mr-2";
                if (accentColor === "secondary") return "text-secondary mr-2";
                if (accentColor === "accent") return "text-accent mr-2";
                return "text-white mr-2";
              };
              return (
                <li key={i} className="flex items-start">
                  <span className={getCheckClasses()}>✓</span>
                  <span className="text-neutral-300 text-xs sm:text-sm">{feature}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-auto pt-4">
          <div className="text-xl font-display font-bold mb-4 text-center">{price}</div>
          <WompiPayment 
            amount={1000} 
            reference={`product-${title.toLowerCase().replace(/\s+/g, '-')}`}
            productName={title}
          />
        </div>
      </div>
    </div>
  );
};

const Products: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    
    if (section && title && subtitle) {
      // Title animation
      gsap.fromTo(
        title,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=100",
            toggleActions: "play none none none"
          }
        }
      );
      
      // Subtitle animation
      gsap.fromTo(
        subtitle,
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          delay: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=100",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  const products = [
    {
      title: "Barber Bot",
      description: "Sistema de gestión y reservas para barberías con IA integrada",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="3"></circle>
          <path d="M8.12 8.12 12 12"></path>
          <path d="M20 4 8.12 15.88"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <path d="M14.8 14.8 20 20"></path>
        </svg>
      ),
      features: [
        "Gestión de citas automática",
        "Recordatorios por WhatsApp",
        "Panel de administración",
        "Análisis de preferencias de clientes"
      ],
      price: "Desde $99/mes",
      accentColor: "secondary",
      delay: 0.2
    },
    {
      title: "Ventas AI",
      description: "Asistente de ventas inteligente para incrementar conversiones",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
          <path d="M3 6h18"></path>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
      ),
      features: [
        "Chatbot de ventas 24/7",
        "Seguimiento de leads",
        "Integración con CRM",
        "Análisis predictivo"
      ],
      price: "Desde $149/mes",
      accentColor: "primary",
      delay: 0.4
    },
    {
      title: "Desarrollo a Medida",
      description: "Soluciones personalizadas para tu negocio",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
      features: [
        "Consultoría tecnológica",
        "Desarrollo web y móvil",
        "Integración con sistemas existentes",
        "Soporte técnico dedicado"
      ],
      price: "Consultar precio",
      accentColor: "accent",
      delay: 0.6
    }
  ];

  return (
    <section ref={sectionRef} id="productos" className="section-padding relative">
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="h-px w-8 bg-primary mr-4"></div>
            <span className="text-neutral-300 uppercase tracking-wider text-sm font-medium">
              Nuestros Productos
            </span>
            <div className="h-px w-8 bg-primary ml-4"></div>
          </div>
          
          <h2 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 sm:mb-6">
            Soluciones <span className="gradient-text">inteligentes</span> para tu negocio
          </h2>
          
          <p ref={subtitleRef} className="text-neutral-300 text-base sm:text-lg px-4 sm:px-0">
            Productos innovadores impulsados por inteligencia artificial para optimizar tus operaciones
            y mejorar la experiencia de tus clientes
          </p>
        </div>
        
        {/* Equal-sized Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              description={product.description}
              icon={product.icon}
              features={product.features}
              price={product.price}
              accentColor={product.accentColor}
              delay={product.delay}
            />
          ))}
        </div>
      </div>

      {/* Sección destacada RFID */}
      <section className="py-16 bg-background-light/80 border-t border-neutral-800/30 mt-8">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 gradient-text">RFID: Nuestra Especialidad</h3>
          <p className="text-neutral-300 text-lg mb-6">
            Somos líderes en soluciones RFID para trazabilidad, control de inventarios, logística y automatización. Nuestra experiencia nos permite ofrecer proyectos llave en mano, integración con sistemas empresariales y soporte completo. ¡Descubre por qué RFID es nuestro fuerte!
          </p>
          <a
            href="/rfid"
            className="btn-primary inline-block mt-2"
          >
            Conoce todo sobre RFID
          </a>
        </div>
      </section>

      {/* Decorative elements */}
      <div className="absolute top-40 -left-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 -right-64 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
}

export default Products;
