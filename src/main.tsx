import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { printSoftdataiConsoleMark } from './utils/brandConsole';
import { useTypewriterTitle } from './hooks/useTypewriterTitle';

// Componente que maneja el título typewriter
const TypewriterTitle: React.FC = () => {
  const phrases = [
    'Soluciones tecnológicas inteligentes',
    'Migración a la nube',
    'Inteligencia artificial',
    'Desarrollo de software',
    'Transformación digital',
    'Automatización de procesos',
    'Análisis de datos',
  ];
  
  useTypewriterTitle(phrases, 80, 50, 2000);
  
  return null;
};

printSoftdataiConsoleMark();

// Add mouse position tracking for hover effects
document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.btn-primary, .btn-secondary, .card, .card-highlight');
  
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
    (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
  });
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TypewriterTitle />
    <App />
  </StrictMode>
);