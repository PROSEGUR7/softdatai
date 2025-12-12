import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import TestPaymentInfo from '../components/TestPaymentInfo';
import WompiTermsAcceptance from '../components/WompiTermsAcceptance';
import WompiJS from '../components/WompiJS';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [acceptanceTokens, setAcceptanceTokens] = useState<{
    acceptanceToken: string;
    personalAuthToken: string;
  }>({ acceptanceToken: '', personalAuthToken: '' });
  const [customerEmail, setCustomerEmail] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [wompiJSInitialized, setWompiJSInitialized] = useState(false);

  // Get payment details from location state
  const paymentDetails = location.state as {
    amount: number;
    reference: string;
    productName: string;
  } | null;

  useEffect(() => {
    // Redirect to home if no payment details
    if (!paymentDetails) {
      navigate('/');
      return;
    }

    // Animation for page elements
    gsap.from('.payment-container', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out'
    });
  }, [paymentDetails, navigate]);
  
  const handleAcceptanceChange = (accepted: boolean, tokens: { acceptanceToken: string; personalAuthToken: string }) => {
    setTermsAccepted(accepted);
    setAcceptanceTokens(tokens);
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerEmail(e.target.value);
  };
  
  const handleWompiInitialized = (sid: string, did: string) => {
    // Silent initialization - no console logs
    setSessionId(sid);
    setDeviceId(did);
    setWompiJSInitialized(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      setError('Debes aceptar los términos y condiciones para continuar.');
      return;
    }
    
    if (!customerEmail) {
      setError('Por favor ingresa tu correo electrónico.');
      return;
    }
    
    if (!sessionId) {
      setError('Error de inicialización de seguridad. Por favor recarga la página.');
      return;
    }
    
    try {
      setProcessing(true);
      setError(null);
      
      if (!paymentDetails) {
        throw new Error('No se encontraron detalles del pago');
      }
      
      const { amount, reference, productName } = paymentDetails;
      
      // Wompi production configuration
      const publicKey = 'pub_prod_CjABwM9kMalfHzwrAaPBTSI9QzUIpYKJ';
      const integritySecret = 'prod_integrity_BGf7ztimlkNBTWpEl9tDa9Q114VkopOh';
      const currency = 'COP';
      const amountInCents = amount * 100; // Convert to cents
      
      // Generate integrity signature
      const concatenatedString = `${reference}${amountInCents}${currency}${integritySecret}`;
      const encoder = new TextEncoder();
      const data = encoder.encode(concatenatedString);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const integritySignature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      // Create form for Wompi checkout
      const form = document.createElement('form');
      form.method = 'GET';
      form.action = 'https://checkout.wompi.co/p/';
      form.target = '_self'; // Ensure it redirects the current window
      
      // Add hidden fields
      const addHiddenField = (name: string, value: string) => {
        const field = document.createElement('input');
        field.type = 'hidden';
        field.name = name;
        field.value = value;
        form.appendChild(field);
      };
      
      addHiddenField('public-key', publicKey);
      addHiddenField('currency', currency);
      addHiddenField('amount-in-cents', amountInCents.toString());
      addHiddenField('reference', reference);
      addHiddenField('signature:integrity', integritySignature);
      addHiddenField('redirect-url', window.location.origin + '/payment-success');
      addHiddenField('data-commerce-name', 'SOFTDATAI');
      addHiddenField('data-product-description', productName);
      addHiddenField('customer-email', customerEmail);
      
      // Add session ID for fingerprinting
      if (sessionId) {
        addHiddenField('session-id', sessionId);
      }
      
      // Add device ID if available
      if (deviceId) {
        addHiddenField('customer-data', JSON.stringify({ device_id: deviceId }));
      }
      
      // Add acceptance tokens
      addHiddenField('acceptance-token', acceptanceTokens.acceptanceToken);
      addHiddenField('accept-personal-auth', acceptanceTokens.personalAuthToken);
      
      // Append form to body and submit
      document.body.appendChild(form);
      form.submit();
      
      // Don't remove the form as it could interrupt submission
      // Just disable the processing state in case the form submission fails
      setTimeout(() => {
        setProcessing(false);
        setError('Si no has sido redirigido a Wompi, haz clic en "Continuar al pago" nuevamente.');
      }, 3000);
      
    } catch (err) {
      // Silent error handling - don't spam console
      setError('Hubo un error al inicializar el pago. Por favor intenta nuevamente.');
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* WompiJS fingerprinting - Hidden but necessary */}
      <WompiJS onInitialized={handleWompiInitialized} />
      <TestPaymentInfo />
      <div className="payment-container max-w-md w-full bg-background-light p-8 rounded-xl shadow-lg border border-neutral-700/30">
        {paymentDetails ? (
          <>
            <h2 className="text-2xl font-display font-bold mb-4 text-center">Finalizar Compra</h2>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-neutral-300">Producto:</span>
                <span className="font-medium">{paymentDetails.productName}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-neutral-300">Precio:</span>
                <span className="font-medium">${paymentDetails.amount.toLocaleString('es-CO')} COP</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-300">Referencia:</span>
                <span className="font-mono text-sm">{paymentDetails.reference}</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  value={customerEmail}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="tu@email.com"
                  required
                />
              </div>
              
              <WompiTermsAcceptance onAcceptanceChange={handleAcceptanceChange} />
              
              {error && (
                <div className="mt-4 p-3 bg-red-900/30 border border-red-800 rounded-md text-red-200 text-sm">
                  {error}
                </div>
              )}
              
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={processing || !termsAccepted || !wompiJSInitialized}
                  className="w-full py-2 px-4 bg-primary hover:bg-primary-dark disabled:bg-neutral-700 disabled:cursor-not-allowed text-white rounded-md transition-colors duration-300 flex items-center justify-center"
                >
                  {processing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Procesando...
                    </>
                  ) : (
                    'Continuar al pago'
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-display font-bold mb-2">Cargando</h2>
            <p className="text-neutral-300">Preparando la información de pago...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
