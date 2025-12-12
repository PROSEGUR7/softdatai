import React, { useState } from 'react';

const TestPaymentInfo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary hover:bg-primary-dark text-white rounded-full p-3 shadow-lg flex items-center justify-center"
        aria-label={isOpen ? "Cerrar información de prueba" : "Ver información de prueba"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </>
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-14 right-0 w-80 bg-background-light border border-neutral-700/30 rounded-lg shadow-xl">
          <div className="p-4 bg-neutral-800 rounded-lg text-sm overflow-y-auto max-h-[70vh]">
            <h3 className="font-bold text-lg mb-3 text-primary">Información para pruebas</h3>
            
            <div className="mb-4 p-2 bg-green-900/30 border border-green-800 rounded">
              <p className="text-green-300 font-medium">Seguridad mejorada</p>
              <p className="text-xs text-neutral-300 mt-1">Esta página utiliza Wompi JS con fingerprinting para protección antifraude.</p>
            </div>
            
            <h3 className="font-display font-bold text-lg mb-2">Datos de prueba Wompi</h3>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Tarjeta de prueba (Aprobada):</h4>
              <div className="bg-neutral-800/50 p-2 rounded">
                <p><span className="font-mono">4242 4242 4242 4242</span></p>
                <p>Fecha: Cualquier fecha futura</p>
                <p>CVC: Cualquier número de 3 dígitos</p>
                <p>Nombre: Cualquier nombre</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Tarjeta de prueba (Rechazada):</h4>
              <div className="bg-neutral-800/50 p-2 rounded">
                <p><span className="font-mono">4111 1111 1111 1111</span></p>
                <p>Fecha: Cualquier fecha futura</p>
                <p>CVC: Cualquier número de 3 dígitos</p>
                <p>Nombre: Cualquier nombre</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Nequi (Aprobado):</h4>
              <p className="font-mono">3991111111</p>
              
              <h4 className="font-semibold mb-1 mt-2">Nequi (Rechazado):</h4>
              <p className="font-mono">3992222222</p>
            </div>
            
            <div className="mt-4 border-t border-neutral-700 pt-3">
              <p className="font-medium mb-1">Seguridad implementada:</p>
              <ul className="list-disc list-inside text-xs text-neutral-300 space-y-1">
                <li>Wompi JS Fingerprinting</li>
                <li>Tokens de aceptación de términos</li>
                <li>Firma de integridad SHA-256</li>
                <li>Validación de correo electrónico</li>
              </ul>
            </div>
            
            <div className="mb-4">
              <p className="font-medium mb-1 mt-3">Otros métodos de pago:</p>
              <ul className="list-disc list-inside text-xs text-neutral-300 space-y-1">
                <li>PSE: Seleccionar cualquier banco en el ambiente de pruebas</li>
                <li>Bancolombia: Usar cualquier número de teléfono</li>
                <li>Daviplata: Usar cualquier número de teléfono</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPaymentInfo;
