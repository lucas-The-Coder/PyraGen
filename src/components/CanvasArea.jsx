import React, { useRef, useState } from 'react';

const CanvasArea = ({ scaleFactor, measurements, setMeasurements }) => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newPoints = [...points, { x, y }];
    setPoints(newPoints);

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();

    if (newPoints.length === 2 && scaleFactor > 0) {
      const dx = newPoints[1].x - newPoints[0].x;
      const dy = newPoints[1].y - newPoints[0].y;
      const pxDist = Math.sqrt(dx * dx + dy * dy);
      const realDist = pxDist * scaleFactor;
      const newMeasurement = {
        from: newPoints[0],
        to: newPoints[1],
        px: pxDist,
        real: realDist,
      };
      setMeasurements([...measurements, newMeasurement]);
      setPoints([]);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: '1px solid black' }}
      onClick={handleClick}
    />
  );
};

export default CanvasArea;