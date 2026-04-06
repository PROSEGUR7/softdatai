import React, { useEffect, useRef, useState } from 'react';
import { Cloud, Layers, LineChart, Database, BrainCircuit, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  index: number;
  isActive: boolean;
  onClick: () => void;
  cardRef: (element: HTMLDivElement | null) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  tags,
  index,
  isActive,
  onClick,
  cardRef,
}) => {
  return (
    <div
      ref={cardRef}
      className={`relative cursor-pointer transition-all duration-300 p-0.5 rounded-xl bg-gradient-to-br from-primary/30 via-primary/10 to-transparent h-full ${
        isActive ? 'scale-[1.02]' : 'hover:scale-[1.01]'
      }`}
      onClick={onClick}
      style={{ opacity: 0 }}
    >
      <div className="bg-background rounded-xl p-4 sm:p-5 h-full min-h-[220px]">
        <div className="flex items-start">
          <div className="rounded-lg p-2 sm:p-3 mr-3 sm:mr-4 bg-primary/20">
            <div className="text-primary">
              {icon}
            </div>
          </div>
          
          <div className="flex flex-col h-full w-full">
            <h3 className="text-base sm:text-lg font-display font-semibold mb-1">{title}</h3>
            <p className="text-neutral-400 text-sm mb-3 leading-relaxed">{description}</p>
            
            <div className="mt-auto flex flex-wrap gap-2">
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-primary/90 bg-primary/10 border border-primary/20 rounded-full px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            <span className="text-xs text-neutral-500 mt-3">Haz clic para ver detalle</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  summary: string;
  tags: string[];
  includes: string[];
  outcomes: string[];
}

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleBlockRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleBlockRef.current) {
        gsap.fromTo(
          titleBlockRef.current.children,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: titleBlockRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      const validCards = cardsRef.current.filter(Boolean);

      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          { y: 38, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      if (detailPanelRef.current) {
        gsap.fromTo(
          detailPanelRef.current,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: detailPanelRef.current,
              start: 'top 87%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      if (blobRef.current) {
        gsap.to(blobRef.current, {
          y: -22,
          x: -10,
          scale: 1.04,
          duration: 4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!detailPanelRef.current) return;

    gsap.fromTo(
      detailPanelRef.current.children,
      { y: 12, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: 'power2.out',
        stagger: 0.08
      }
    );
  }, [activeService]);
  
  const services: ServiceItem[] = [
    {
      icon: <Cloud size={24} />,
      title: "Arquitectura y migración cloud",
      description: "Migración segura y ordenada a Azure o Google Cloud.",
      summary: "Definimos una ruta de adopción cloud alineada a tus prioridades operativas y financieras.",
      tags: ["Azure", "Google Cloud", "Seguridad"],
      includes: [
        "Arquitectura y roadmap por fases",
        "Estrategia de costos y gobierno",
        "Hardening y cumplimiento"
      ],
      outcomes: [
        "Escalabilidad sin fricciones",
        "Mayor continuidad del servicio",
        "Reduccion de costos operativos"
      ]
    },
    {
      icon: <Layers size={24} />,
      title: "Modernización y desarrollo a medida",
      description: "Evolucionamos plataformas legacy a productos escalables.",
      summary: "Actualizamos componentes criticos y construimos nuevas capacidades sin frenar la operacion.",
      tags: ["Apps web", "APIs", "Integraciones"],
      includes: [
        "Refactor y modularizacion gradual",
        "Desarrollo de APIs y frontends",
        "Integracion con sistemas existentes"
      ],
      outcomes: [
        "Mejor experiencia de usuario",
        "Menos deuda tecnica",
        "Mayor velocidad de evolucion"
      ]
    },
    {
      icon: <LineChart size={24} />,
      title: "Analítica de datos y BI",
      description: "Tableros y KPIs para decisiones basadas en datos.",
      summary: "Convertimos informacion dispersa en una capa de analitica clara para direccion y equipos.",
      tags: ["Dashboards", "KPIs", "Reportes"],
      includes: [
        "Modelo de datos para negocio",
        "Visualizaciones ejecutivas y operativas",
        "Alertas y reportes automaticos"
      ],
      outcomes: [
        "Lectura rapida del negocio",
        "Seguimiento en tiempo real",
        "Decisiones mas precisas"
      ]
    },
    {
      icon: <Database size={24} />,
      title: "Ingeniería y optimización de bases de datos",
      description: "Rendimiento y disponibilidad para datos criticos.",
      summary: "Ajustamos estructura, consultas y respaldos para que tus sistemas respondan mejor.",
      tags: ["Performance", "Backups", "Integridad"],
      includes: [
        "Diagnostico y tuning de consultas",
        "Diseno de respaldo y recuperacion",
        "Monitoreo preventivo"
      ],
      outcomes: [
        "Menor latencia",
        "Mayor estabilidad",
        "Datos mas confiables"
      ]
    },
    {
      icon: <BrainCircuit size={24} />,
      title: "IA aplicada al negocio",
      description: "Modelos de IA para prediccion y automatizacion.",
      summary: "Aplicamos IA donde genera impacto directo: ventas, operacion, riesgo y atencion.",
      tags: ["Prediccion", "Recomendacion", "Riesgo"],
      includes: [
        "Modelos de clasificacion y prediccion",
        "Deteccion de anomalias",
        "Asistentes por flujo operativo"
      ],
      outcomes: [
        "Menos tareas manuales",
        "Mejor exactitud operativa",
        "Escalamiento de resultados"
      ]
    },
    {
      icon: <Zap size={24} />,
      title: "Automatización inteligente",
      description: "Flujos automáticos con n8n, chatbots y WhatsApp.",
      summary: "Conectamos canales y sistemas para reducir tiempos de respuesta y aumentar conversion.",
      tags: ["n8n", "WhatsApp", "CRM"],
      includes: [
        "Diseno de flujos de automatizacion",
        "Chatbots con contexto de negocio",
        "Integraciones con CRM y canales"
      ],
      outcomes: [
        "Atencion 24/7",
        "Menos cuellos de botella",
        "Mejor trazabilidad comercial"
      ]
    }
  ];

  const selectedService = services[activeService];

  return (
    <section ref={sectionRef} id="servicios" className="section-padding relative">
      <div className="container mx-auto container-padding">
        <div
          ref={titleBlockRef}
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
            Un portafolio claro y modular para modernizar tu empresa sin sobrecargar la experiencia
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              tags={service.tags}
              index={index}
              isActive={activeService === index}
              onClick={() => setActiveService(index)}
              cardRef={(element) => {
                cardsRef.current[index] = element;
              }}
            />
          ))}
        </div>

        <div
          ref={detailPanelRef}
          className="mt-8 p-6 md:p-8 bg-background-light/70 backdrop-blur-md rounded-xl border border-neutral-700/50"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="text-primary">{selectedService.icon}</div>
            <h3 className="text-xl md:text-2xl font-display font-bold text-white">{selectedService.title}</h3>
          </div>

          <p className="text-neutral-300 mb-6">{selectedService.summary}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm uppercase tracking-wide text-primary font-medium mb-3">Incluye</h4>
              <ul className="space-y-2">
                {selectedService.includes.map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    <span className="text-neutral-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-wide text-primary font-medium mb-3">Resultados esperados</h4>
              <ul className="space-y-2">
                {selectedService.outcomes.map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-neutral-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div
          ref={ctaRef}
          className="mt-12 text-center"
        >
          <a href="#contacto" className="btn-primary">
            Consulta sobre nuestros servicios
          </a>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div ref={blobRef} className="absolute bottom-20 -right-64 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default Services;