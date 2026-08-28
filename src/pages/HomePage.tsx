import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Products from '../components/Products';
import Sectors from '../components/Sectors';
import WhyChooseUs from '../components/WhyChooseUs';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import CursorSpotlight from '../components/CursorSpotlight';
import FloatingMascot from '../components/FloatingMascot';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const mainRef = useRef<HTMLElement>(null);
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    products: useRef<HTMLDivElement>(null),
    sectors: useRef<HTMLDivElement>(null),
    whyChooseUs: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null)
  };

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      sectionRefs.hero.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );

    const sections = [
      sectionRefs.about.current,
      sectionRefs.services.current,
      sectionRefs.products.current,
      sectionRefs.sectors.current,
      sectionRefs.whyChooseUs.current,
      sectionRefs.contact.current
    ];

    sections.forEach((section) => {
      if (section) {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: 'top bottom-=100',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background-dark overflow-hidden relative">
      <ParticleBackground />
      <CursorSpotlight />
      
      <Navbar />
      
      <main ref={mainRef}>
        <div ref={sectionRefs.hero}>
          <Hero />
        </div>
        
        <div ref={sectionRefs.about}>
          <About />
        </div>
        
        <div ref={sectionRefs.services}>
          <Services />
        </div>

        <div ref={sectionRefs.products}>
          <Products />
        </div>
        
        <div ref={sectionRefs.sectors}>
          <Sectors />
        </div>
        
        <div ref={sectionRefs.whyChooseUs}>
          <WhyChooseUs />
        </div>
        
        <div ref={sectionRefs.contact}>
          <Contact />
        </div>

      </main>
      <Footer />
      
      {/* Mascota flotante con chat IA */}
      <FloatingMascot />
    </div>
  );
};

export default HomePage;
