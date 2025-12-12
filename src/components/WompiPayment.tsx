import React, { useState } from 'react';
import wompiConfig, { generateIntegritySignature } from '../config/wompi';

interface WompiPaymentProps {
  amount: number;
  reference: string;
  productName: string;
  buttonText?: string;
}

const WompiPayment: React.FC<WompiPaymentProps> = ({ amount, reference, productName, buttonText }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Determine button text based on product name or provided buttonText
  const getButtonText = () => {
    if (buttonText) return buttonText;
    
    if (productName.toLowerCase().includes('desarrollo')) {
      return 'Contáctanos';
    }
    return 'Pagar ahora';
  };
  
  // Handle payment button click - directly create and submit Wompi form
  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      // Usar la configuración centralizada de Wompi
      const { publicKey } = wompiConfig;
      const currency = 'COP';
      const amountInCents = amount * 100; // Convert to cents
      const email = 'cliente@ejemplo.com'; // Cliente de prueba
      
      // Use hardcoded test values for acceptance tokens
      const acceptanceToken = "eyJhbGciOiJIUzI1NiJ9.eyJjb250cmFjdF9pZCI6MSwicGVybWFsaW5rIjoiaHR0cHM6Ly93b21waS5jby93cC1jb250ZW50L3VwbG9hZHMvMjAxOS8wOS9URVJNSU5PUy1ZLUNPTkRJQ0lPTkVTLURFLVVTTy1VU1VBUklPUy1XT01QSS5wZGYiLCJmaWxlX2hhc2giOiIzZGNkMGM5OGU3NGFhYjk3OTdjZmY3ODExNzMxZjc3YiIsImppdCI6IjE1ODEwOTIzNjItMzk1NDkiLCJleHAiOjE1ODEwOTU5NjJ9.JwGfnfXsP9fbyOiQXFtQ_7T4r-tjvQrkFx0NyfIED5s";
      const personalDataToken = "eyJhbGciOiJIUzI1NiJ9.eyJjb250cmFjdF9pZCI6NDQxLCJwZXJtYWxpbmsiOiJodHRwczovL3dvbXBpLmNvbS9hc3NldHMvZG93bmxvYWRibGUvYXV0b3JpemFjaW9uLWFkbWluaXN0cmFjaW9uLWRhdG9zLXBlcnNvbmFsZXMucGRmIiwiZmlsZV9oYXNoIjoiOTVkYzcwN2M0M2UxYmViMDAwMDUyZDNkNWJhZThhMDAiLCJqaXQiOiIxNzI5NTYwMTg3LTM3NDkxIiwiZW1haWwiOiIifQ.BhCzd8KyV0S_M5m22pmNu5lq8JV0L16JXkA2-OgZ5tQ";
      
      // Generar firma de integridad usando la función centralizada
      const integritySignature = await generateIntegritySignature(reference, amountInCents, currency);
      
      // Crear un formulario para el checkout de Wompi
      const form = document.createElement('form');
      form.method = 'POST'; 
      form.action = 'https://sandbox.wompi.co/v1/widget-checkout'; 
      form.target = '_self';
      
      // Agregar campos ocultos
      const addHiddenField = (name: string, value: string) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
      };
      
      // Agregar campos requeridos
      addHiddenField('public_key', publicKey);
      addHiddenField('currency', currency);
      addHiddenField('amount_in_cents', amountInCents.toString());
      addHiddenField('reference', reference);
      addHiddenField('signature', integritySignature); 
      
      // Agregar información del cliente
      addHiddenField('customer_email', email);
      
      // Agregar URLs de redirección
      const baseUrl = window.location.origin;
      addHiddenField('redirect_url', `${baseUrl}/payment-success`);
      
      // Agregar información del producto
      addHiddenField('product_description', productName);
      
      // Agregar tokens de aceptación
      addHiddenField('acceptance_token', acceptanceToken);
      addHiddenField('customer_data_token', personalDataToken);
      
      // Enviar el formulario
      document.body.appendChild(form);
      
      // Establecer un tiempo de espera para mostrar mensaje de error si falla el envío del formulario
      const redirectTimeout = setTimeout(() => {
        setIsLoading(false);
        alert('Error al redirigir a la pasarela de pagos. Por favor, inténtalo de nuevo.');
      }, 5000);
      
      // Enviar formulario y limpiar el tiempo de espera
      form.submit();
      clearTimeout(redirectTimeout);
      
      // Limpiar - eliminar el formulario del DOM
      setTimeout(() => {
        document.body.removeChild(form);
      }, 1000);
    } catch (error) {
      console.error('Error al preparar el pago:', error);
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full flex flex-col items-center">
      <button 
        onClick={handlePayment}
        className="w-48 px-3 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-md text-sm transition-colors duration-300 flex items-center justify-center"
        disabled={isLoading}
      >
        <span>{isLoading ? 'Procesando...' : getButtonText()}</span>
        {!isLoading && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
            <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default WompiPayment;
