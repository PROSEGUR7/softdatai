import { useState, useEffect } from 'react';

/**
 * Hook para el efecto de título typewriter en la pestaña del navegador
 */
export const useTypewriterTitle = (
  phrases: string[],
  typingSpeed: number = 100,
  deletingSpeed: number = 60,
  pauseDuration: number = 1500,
  baseTitle: string = 'SOFTDATAI - '
) => {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  
  const currentPhrase = phrases[phraseIndex];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isTyping) {
      if (charIndex < currentPhrase.length) {
        timeout = setTimeout(() => {
          const newText = currentPhrase.substring(0, charIndex + 1);
          setDisplayText(newText);
          document.title = `${baseTitle}${newText}|`;
          setCharIndex(charIndex + 1);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          const newText = currentPhrase.substring(0, charIndex - 1);
          setDisplayText(newText);
          document.title = `${baseTitle}${newText}|`;
          setCharIndex(charIndex - 1);
        }, deletingSpeed);
      } else {
        setPhraseIndex((phraseIndex + 1) % phrases.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isTyping, currentPhrase, phraseIndex, phrases.length, typingSpeed, deletingSpeed, pauseDuration, baseTitle]);

  return { displayText };
};