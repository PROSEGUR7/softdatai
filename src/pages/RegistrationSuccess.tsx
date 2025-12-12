import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-background-dark/30 backdrop-blur-sm rounded-xl p-8 text-center border border-neutral-800 shadow-xl"
      >
        <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
          <Check className="text-green-400 w-10 h-10" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
          ¡Registro Exitoso!
        </h1>
        
        <p className="text-neutral-300 mb-8">
          Gracias por registrarte en SOFTDATAI. Hemos recibido tu información y nos pondremos en contacto contigo a la brevedad posible.
        </p>
        
        <div className="text-sm text-neutral-400 mb-6">
          Serás redirigido a la página de inicio en unos segundos...
        </div>
        
        <button
          onClick={() => navigate('/')}
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background-dark"
        >
          Volver al inicio ahora
        </button>
      </motion.div>
    </div>
  );
};

export default RegistrationSuccess;
