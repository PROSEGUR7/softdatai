import React, { useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Calendar } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const meetingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { x: -36, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 84%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      const validItems = itemRefs.current.filter(Boolean);

      if (validItems.length > 0) {
        gsap.fromTo(
          validItems,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      if (meetingRef.current) {
        gsap.fromTo(
          meetingRef.current,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: meetingRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );

        gsap.to(meetingRef.current, {
          y: -6,
          duration: 2.4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactItems = [
    {
      title: 'Teléfono',
      value: '+57 315 3547423',
      icon: <Phone size={20} />
    },
    {
      title: 'Email',
      value: 'gerencia@softdatai.com',
      icon: <Mail size={20} />
    },
    {
      title: 'Ubicación',
      value: 'Bogotá, Colombia',
      icon: <MapPin size={20} />
    }
  ];

  return (
    <section ref={sectionRef} id="contacto" className="section-padding relative">
      <div className="container mx-auto container-padding">
        <div
          ref={headingRef}
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
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div>
            <div ref={cardRef} className="p-8 bg-background-light/70 backdrop-blur-md rounded-xl border border-neutral-700/50 mb-8" style={{ opacity: 0 }}>
              <h3 className="text-2xl font-display font-bold mb-6 gradient-text">
                Información de contacto
              </h3>
              
              <div className="space-y-6">
                {contactItems.map((item, index) => (
                  <div
                    key={item.title}
                    ref={(element) => {
                      itemRefs.current[index] = element;
                    }}
                    className="flex items-start"
                    style={{ opacity: 0 }}
                  >
                    <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center mr-4 text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{item.title}</h4>
                      <p className="text-neutral-300">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div ref={meetingRef} className="p-8 bg-background-light/70 backdrop-blur-md rounded-xl border border-neutral-700/50" style={{ opacity: 0 }}>
              <div className="flex items-start mb-6">
                <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center mr-4 text-primary">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg mb-1">Agenda una reunión</h4>
                  <p className="text-neutral-300 mb-4">Programa una sesión de consultoría gratuita</p>
                </div>
              </div>
              
              <a
                href="https://wa.me/573153547423"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full flex items-center justify-center"
              >
                Agendar reunión
                <Calendar size={18} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;