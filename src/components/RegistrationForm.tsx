import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Select from 'react-select';
import { allCountries } from 'country-telephone-data';

interface CountryOption {
  label: string;
  value: string;
  dialCode: string;
}

interface CustomStyles {
  [key: string]: any;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  countryCode?: string;
  form?: string;
  _form?: string; // For general form errors
}

const RegistrationForm: React.FC = (): JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState<CountryOption | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  // Removed unused formError state since we're using errors._form instead
  
  const options = useMemo(() => {
    return allCountries.map((country: { name: string; dialCode: string; iso2: string }) => ({
      label: `${country.name} (+${country.dialCode})`,
      value: country.iso2,
      dialCode: country.dialCode
    }));
  }, []);
  
  const customStyles: CustomStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: 'white',
      borderColor: errors.countryCode ? '#ef4444' : '#404040',
      borderRadius: '0.5rem',
      minHeight: '42px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'rgba(108, 99, 255, 0.7)'
      },
      '&:focus': {
        borderColor: 'rgba(108, 99, 255, 0.7)',
        boxShadow: '0 0 0 1px rgba(108, 99, 255, 0.7)'
      }
    }),
    option: (provided: any, state: { isSelected: any; isFocused: any; }) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? 'rgba(108, 99, 255, 0.7)'
        : state.isFocused
        ? 'rgba(108, 99, 255, 0.2)'
        : 'white',
      color: state.isSelected ? '#ffffff' : '#000000',
      cursor: 'pointer',
      padding: '8px 12px',
      '&:hover': {
        backgroundColor: state.isSelected ? 'rgba(108, 99, 255, 0.7)' : 'rgba(108, 99, 255, 0.2)'
      },
      '&:active': {
        backgroundColor: 'rgba(108, 99, 255, 0.7)'
      }
    }),
    input: (provided: any) => ({
      ...provided,
      color: '#000000'
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#9ca3af'
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#000000'
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      border: '1px solid rgba(82, 82, 82, 0.5)'
    }),
    menuList: (provided: any) => ({
      ...provided,
      padding: '0.25rem',
      maxHeight: '200px'
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      backgroundColor: 'rgba(82, 82, 82, 0.5)'
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: 'rgba(108, 99, 255, 0.7)',
      '&:hover': {
        color: 'rgba(108, 99, 255, 1)'
      }
    })
  };



  const checkDuplicate = async (field: string, value: string): Promise<boolean> => {
    // Si estamos en desarrollo local, no verificar duplicados para facilitar las pruebas
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('Modo desarrollo: omitiendo verificación de duplicados');
      return false;
    }

    try {
      // Verificar si el valor está vacío
      if (!value || !value.trim()) {
        console.log('Valor vacío, omitiendo verificación de duplicado');
        return false;
      }
      
      // Usar los nombres de campo que espera el backend
      const dbField = field === 'email' ? 'email' : 'telefono';
      const requestBody = { 
        field: dbField, 
        value: value.trim() 
      };
      
      console.log('Verificando duplicado:', requestBody);
      
      // Usar URL relativa para evitar problemas de CORS
      const apiUrl = 'https://softdatai.com/api/check_duplicate.php';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody),
      });
      
      console.log('Respuesta del servidor:', response.status, response.statusText);
      
      // Manejar errores de validación (400)
      if (response.status === 400) {
        const errorData = await response.json().catch(() => ({}));
        console.warn('Error de validación en el servidor:', errorData);
        return false; // Continuar sin bloquear al usuario
      }
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error en la respuesta del servidor:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json().catch(e => {
        console.error('Error al parsear la respuesta JSON:', e);
        throw new Error('Respuesta no válida del servidor');
      });
      
      console.log('Datos de respuesta:', data);
      
      // Manejar diferentes formatos de respuesta
      if (data && typeof data === 'object') {
        if (typeof data.exists === 'boolean') {
          return data.exists;
        } else if (data.success === false) {
          console.warn('El servidor reportó un error:', data.message || 'Error desconocido');
          return false;
        }
      }
      
      console.warn('Formato de respuesta inesperado, continuando sin validación de duplicados');
      return false;
      
    } catch (error) {
      console.error('Error en checkDuplicate:', {
        error: error instanceof Error ? error.message : 'Error desconocido',
        field,
        value: value ? '***' : 'undefined',
      });
      return false; // Por defecto, no bloquear al usuario
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    // Reset errors state is handled by setErrors({})
    
    // Validate required fields
    const newErrors: FormErrors = {};
    
    if (!email) newErrors.email = 'El correo electrónico es obligatorio';
    if (!phone) newErrors.phone = 'El número de teléfono es obligatorio';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Client-side validation
      const newErrors: FormErrors = {};
      
      if (!name.trim()) {
        newErrors.name = 'El nombre es obligatorio';
      }
      
      if (!email.trim()) {
        newErrors.email = 'El correo electrónico es obligatorio';
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        newErrors.email = 'El correo electrónico no es válido';
      }
      
      if (!phone.trim()) {
        newErrors.phone = 'El número de teléfono es obligatorio';
      } else if (!/^[0-9\s()-]+$/.test(phone)) {
        newErrors.phone = 'El número de teléfono solo debe contener números';
      } else if (phone.length < 7) {
        newErrors.phone = 'El número de teléfono es demasiado corto';
      }
      
      if (!countryCode) {
        newErrors.countryCode = 'Debes seleccionar un indicativo de país';
      }
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsSubmitting(false);
        return;
      }
      
      // Check for duplicate email and phone
      const fullPhoneNumber = countryCode ? `${countryCode.dialCode}${phone.replace(/\D/g, '')}` : phone;
      
      try {
        // Check for duplicates sequentially
        const [isEmailDuplicate, isPhoneDuplicate] = await Promise.all([
          checkDuplicate('email', email),
          checkDuplicate('telefono', fullPhoneNumber)
        ]);
        
        const newErrors: FormErrors = {};
        let hasErrors = false;
        
        if (isEmailDuplicate) {
          newErrors.email = 'Este correo electrónico ya está registrado';
          hasErrors = true;
        }
        
        if (isPhoneDuplicate) {
          newErrors.phone = 'Este número de teléfono ya está registrado';
          hasErrors = true;
        }
        
        if (hasErrors) {
          // If both email and phone are duplicates
          if (isEmailDuplicate && isPhoneDuplicate) {
            newErrors._form = '¡Ups! Ya existe una cuenta con este correo y número de teléfono. Por favor, utiliza otros datos o inicia sesión.';
          } else if (isEmailDuplicate) {
            newErrors._form = 'Ya existe una cuenta con este correo electrónico. ¿Ya tienes una cuenta? Intenta iniciar sesión.';
          } else if (isPhoneDuplicate) {
            newErrors._form = 'Ya existe una cuenta con este número de teléfono. ¿Ya tienes una cuenta? Intenta iniciar sesión.';
          }
          
          setErrors(newErrors);
          setIsSubmitting(false);
          
          // Scroll to the first error
          setTimeout(() => {
            const firstErrorField = isEmailDuplicate ? 'email' : 'phone';
            document.getElementById(firstErrorField)?.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }, 100);
          
          return;
        }
      } catch (error) {
        console.error('Error durante la verificación de duplicados:', error);
        // Continue with form submission even if duplicate check fails
      }

      // Submit the form if no duplicates found
      const requestData = {
        nombre_completo: name.trim(),
        correo: email.trim().toLowerCase(),
        telefono: fullPhoneNumber,
        pais: countryCode?.label || 'Colombia' // Usar el país seleccionado o un valor por defecto
      };
      
      console.log('Enviando datos al servidor:', requestData);
      
      const response = await fetch('https://softdatai.com/api/register.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      
      console.log('Respuesta del servidor - Status:', response.status);
      
      let data;
      try {
        data = await response.json();
        console.log('Datos de respuesta:', data);
      } catch (jsonError) {
        console.error('Error al parsear la respuesta JSON:', jsonError);
        const text = await response.text();
        console.log('Respuesta en texto plano:', text);
        throw new Error('La respuesta del servidor no es un JSON válido');
      }
      
      if (!response.ok) {
        console.error('Error del servidor:', {
          status: response.status,
          statusText: response.statusText,
          data
        });
        
        // Handle specific server errors
        if (response.status === 409) {
          const errorMessage = (data.message || '').toLowerCase();
          const isEmailError = errorMessage.includes('correo');
          const isPhoneError = errorMessage.includes('teléfono') || errorMessage.includes('telefono');
          
          if (isEmailError && isPhoneError) {
            throw new Error('Ya existe una cuenta con este correo y número de teléfono.');
          } else if (isEmailError) {
            throw new Error('Este correo electrónico ya está registrado.');
          } else if (isPhoneError) {
            throw new Error('Este número de teléfono ya está registrado.');
          }
        }
        
        throw new Error(data.message || `Error del servidor (${response.status}): ${response.statusText}`);
      }
      
      // Reset form on success
      setName('');
      setEmail('');
      setPhone('');
      setCountryCode(null);
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      let errorMessage = 'Ocurrió un error al procesar tu registro. Por favor, intenta de nuevo más tarde.';
      
      if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = String(error.message);
      } else if (error) {
        errorMessage = String(error);
      }
      
      console.log('Detalles del error:', { error });
      setErrors({
        _form: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show success message
  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="relative w-full max-w-md mx-4 text-center z-10"
        >
          <div className="p-6 sm:p-8 border border-white/20 rounded-xl bg-black/5 backdrop-blur-sm">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-white/30">
              <Check className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <h3 className="font-bold text-2xl sm:text-3xl text-white mb-3">¡Registro exitoso!</h3>
            <p className="text-white/90 mb-6 sm:mb-8 text-base sm:text-lg">Tu registro se ha completado correctamente.</p>
            
            <button
              onClick={() => window.location.href = '/'}
              className="w-full max-w-xs mx-auto bg-white/10 hover:bg-white/20 text-white font-medium py-3 sm:py-4 px-6 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/5 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Volver al inicio
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-transparent border border-white/20 rounded-xl backdrop-blur-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-4 pt-6 px-4"
      >
        <div className="flex items-center justify-center mb-3">
          <div className="h-px w-6 bg-white/50 mr-3"></div>
          <span className="text-white/90 uppercase tracking-wider text-sm font-medium">
            Registro
          </span>
          <div className="h-px w-6 bg-white/50 ml-3"></div>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
          Únete a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">SOFTDATAI</span>
        </h2>
        
        <p className="text-white/90 text-sm md:text-base mb-4">
          Completa el formulario para recibir información sobre nuestros servicios.
        </p>
      </motion.div>
      
      <div className="px-6 pb-6 bg-transparent">
        {errors._form && (
          <div 
            className="mb-6 p-4 bg-red-500/10 border-l-4 border-red-500 text-red-100 rounded-r"
            data-error-message
          >
            <p className="font-medium">{errors._form}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 bg-white border ${
                errors.name ? 'border-red-500' : 'border-neutral-700'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black`}
              placeholder="Tu nombre"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 bg-white border ${
                errors.email ? 'border-red-500' : 'border-neutral-700'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black`}
              placeholder="correo@ejemplo.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="countryCode" className="block text-sm font-medium text-white/90 mb-1">
              Indicativo del país
            </label>
            <Select
              id="countryCode"
              options={options}
              value={countryCode}
              onChange={(value) => setCountryCode(value as CountryOption)}
              placeholder="Selecciona indicativo"
              styles={customStyles}
              className={errors.countryCode ? 'react-select-error' : ''}
              classNamePrefix="react-select"
            />
            {errors.countryCode && (
              <p className="mt-1 text-sm text-red-500">{errors.countryCode}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-1">
              Número de teléfono
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full px-4 py-2 bg-white border ${
                errors.phone ? 'border-red-500' : 'border-neutral-700'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black`}
              placeholder="Número"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
            } focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background-dark`}
          >
            {isSubmitting ? 'Procesando...' : 'Registrarme'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
