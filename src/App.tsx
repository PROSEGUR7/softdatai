import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import RegistrationSuccess from './pages/RegistrationSuccess';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentPage from './pages/PaymentPage';
import RFIDLanding from './pages/RFIDLanding';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registro" element={<RegistrationPage />} />
        <Route path="/registro-exitoso" element={<RegistrationSuccess />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/rfid" element={<RFIDLanding />} />
      </Routes>
    </Router>
  );
};

export default App;