import React, { useEffect, useState } from 'react';

interface MascotHeadProps {
  animationSpeed?: number;
  size?: number;
  frameWidth?: number;
  frameHeight?: number;
  rowRepetitions?: number;
  /** Factor de zoom aplicado al sprite sheet. >1 hace zoom in (muestra solo la cabeza, recorta padding). */
  zoom?: number;
  /** Radio del borde. Usa un porcentaje (e.g. '50%') para círculo o número en px para redondeado. */
  borderRadius?: string | number;
  /** Offset manual X en px (útil para centrar la cabeza si tiene padding lateral). */
  offsetX?: number;
  /** Offset manual Y en px (útil para centrar la cabeza si tiene padding vertical). */
  offsetY?: number;
}

// Frames validos por fila (indices 0-based de columna).
// Filas no listadas usan todos los frames [0..7].
// Hoja "petheadsoft.png": 11 filas x 8 columnas.
const validFramesByRow: Record<number, number[]> = {
  0: [0, 1, 2, 3, 4, 5], // fila 1: hasta el 6 (1-based)
  3: [0, 1, 2, 3],       // fila 4: hasta el 4 (1-based)
  4: [0, 1, 2, 3, 4],    // fila 5: hasta el 5 (1-based)
  6: [0, 1, 2, 3, 4, 5], // fila 7: hasta el 6 (1-based)
  7: [0, 1, 2, 3, 4, 5], // fila 8: hasta el 6 (1-based)
  8: [0, 1, 2, 3, 4, 5], // fila 9: hasta el 6 (1-based)
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

const MascotHead: React.FC<MascotHeadProps> = ({
  animationSpeed = 200,
  size = 48,
  frameWidth = 120,
  frameHeight = 120,
  rowRepetitions = 1,
  zoom = 0.5,
  borderRadius = '50%',
  offsetX = 0,
  offsetY = 0,
}) => {
  const totalFrames = 8;
  const spriteSheetWidth = frameWidth * totalFrames;
  const spriteSheetHeight = frameHeight * totalRows;

  // El background-size se multiplica por zoom para hacer zoom-in al frame.
  const zoomedSheetWidth = spriteSheetWidth * zoom;
  const zoomedSheetHeight = spriteSheetHeight * zoom;

  const [currentFrame, setCurrentFrame] = useState(0);

  const animationSequence = buildAnimationFrames(rowRepetitions);

  const { row: currentRow, col: currentCol } = animationSequence[currentFrame];

  // Con zoom, el desplazamiento por frame se multiplica proporcionalmente.
  const backgroundPositionX = -currentCol * frameWidth * zoom + offsetX;
  const backgroundPositionY = -currentRow * frameHeight * zoom + offsetY;

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
        borderRadius,
        overflow: 'hidden',
        flexShrink: 0,
        backgroundColor: 'transparent',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/images/petheadsoft.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${zoomedSheetWidth}px ${zoomedSheetHeight}px`,
          backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
        }}
      />
    </div>
  );
};

export default MascotHead;
