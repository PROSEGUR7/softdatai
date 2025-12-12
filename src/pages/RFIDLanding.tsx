import React from 'react';

const RFIDLanding: React.FC = () => {
  return (
    <section className="section-padding min-h-screen flex items-center justify-center bg-background">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 gradient-text">
          RFID: Nuestra Especialidad
        </h1>
        <p className="text-lg text-neutral-300 mb-8">
          En SOFTDATAI somos expertos en soluciones RFID para trazabilidad, control de inventarios, logística y automatización de procesos. Implementamos sistemas RFID a medida para empresas de todos los sectores, integrando hardware, software y analítica avanzada.
        </p>
        <ul className="text-left text-neutral-200 mb-8 space-y-3 mx-auto max-w-xl">
          <li>• Consultoría y diagnóstico RFID</li>
          <li>• Integración con sistemas empresariales (ERP, WMS, etc.)</li>
          <li>• Desarrollo de software y dashboards para monitoreo en tiempo real</li>
          <li>• Instalación y soporte de hardware RFID</li>
          <li>• Proyectos llave en mano y capacitación</li>
        </ul>
        <p className="text-neutral-400 mb-4">
          ¿Quieres saber cómo la tecnología RFID puede transformar tu empresa?
        </p>
        <a href="#contacto" className="btn-primary inline-block">Solicita una asesoría gratuita</a>
      </div>
    </section>
  );
};

export default RFIDLanding;
