import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

const PaymentSuccessPage: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    if (contentRef.current && titleRef.current && messageRef.current && buttonRef.current) {
      // Animation sequence
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 }
      ).fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6 },
        "-=0.4"
      ).fromTo(
        messageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.3"
      ).fromTo(
        buttonRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background-dark overflow-hidden relative">
      <ParticleBackground />
      
      <Navbar />
      
      <main className="section-padding">
        <div className="container mx-auto container-padding flex items-center justify-center min-h-[70vh]">
          <div 
            ref={contentRef}
            className="card-highlight max-w-2xl w-full text-center py-12 px-6"
          >
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-success"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            
            <h1 ref={titleRef} className="text-3xl sm:text-4xl font-display font-bold mb-4">
              ¡Pago <span className="gradient-text">exitoso</span>!
            </h1>
            
            <p ref={messageRef} className="text-neutral-300 text-base sm:text-lg mb-8">
              Gracias por tu compra. Hemos recibido tu pago correctamente y pronto nos pondremos en contacto contigo para configurar tu servicio.
            </p>
            
            <Link 
              ref={buttonRef}
              to="/" 
              className="btn-primary inline-block"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
