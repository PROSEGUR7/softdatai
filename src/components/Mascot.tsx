import React, { useEffect, useState } from 'react';

interface MascotProps {
  animationSpeed?: number;
  size?: number;
  frameWidth?: number;
  frameHeight?: number;
  rowRepetitions?: number;
}

// Frames validos por fila (indices 0-based de columna).
// Filas no listadas usan todos los frames [0..7].
const validFramesByRow: Record<number, number[]> = {
  0: [0, 1, 2, 3, 4, 5], // fila 1: quita 7 y 8
  3: [0, 1, 2, 3],       // fila 4: quita del 5 al 8
  4: [0, 1, 2, 3, 4],    // fila 5: quita del 6 al 8
  6: [0, 1, 2, 3, 4],    // fila 7: quita del 6 al 8
  7: [0, 1, 2, 3, 4],    // fila 8: quita del 6 al 8
  8: [0, 1, 2, 3, 4],    // fila 9: quita del 6 al 8
};

const allFrames = [0, 1, 2, 3, 4, 5, 6, 7];
const totalRows = 11;

// Construye la secuencia plana de frames para animar (row, col).
const buildAnimationFrames = (repetitions: number): Array<{ row: number; col: number }> => {
  const sequence: Array<{ row: number; col: number }> = [];
  for (let row = 0; row < totalRows; row++) {
    const cols = validFramesByRow[row] ?? allFrames;
    for (let r = 0; r < repetitions; r++) {
      for (const col of cols) {
        sequence.push({ row, col });
      }
    }
  }
  return sequence;
};

const Mascot: React.FC<MascotProps> = ({
  animationSpeed = 170,
  size = 120,
  frameWidth = 120,
  frameHeight = 120,
  rowRepetitions = 2
}) => {
  const totalFrames = 8;
  const spriteSheetWidth = frameWidth * totalFrames;
  const spriteSheetHeight = frameHeight * totalRows;

  const [currentFrame, setCurrentFrame] = useState(0);

  const animationSequence = buildAnimationFrames(rowRepetitions);

  const { row: currentRow, col: currentCol } = animationSequence[currentFrame];

  const backgroundPositionX = -currentCol * frameWidth;
  const backgroundPositionY = -currentRow * frameHeight;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % animationSequence.length);
    }, animationSpeed);
    return () => clearInterval(interval);
  }, [animationSpeed, animationSequence.length]);

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
        imageRendering: 'pixelated',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/images/petsoftdatai.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${spriteSheetWidth}px ${spriteSheetHeight}px`,
          backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
        }}
      />
    </div>
  );
};

export default Mascot;