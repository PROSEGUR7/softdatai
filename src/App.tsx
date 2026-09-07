import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import RegistrationSuccess from './pages/RegistrationSuccess';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentPage from './pages/PaymentPage';
import Seo from './components/Seo';
import { useTypewriterTitle } from './hooks/useTypewriterTitle';

const TypewriterTitle: React.FC = () => {
  const { pathname } = useLocation();
  const phrases = [
    'Soluciones tecnológicas inteligentes',
    'Migración a la nube',
    'Inteligencia artificial',
    'Desarrollo de software',
    'Transformación digital',
    'Automatización de procesos',
    'Análisis de datos',
  ];

  useTypewriterTitle(phrases, 80, 50, 2000, 'Softdatai | ', pathname === '/');

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <Seo />
      <TypewriterTitle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registro" element={<RegistrationPage />} />
        <Route path="/registro-exitoso" element={<RegistrationSuccess />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
      </Routes>
    </Router>
  );
};

export default App;
