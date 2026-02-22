import React, { useState } from 'react';
import CanvasArea from './components/CanvasArea';
import UploadZone from './components/UploadZone';
import MeasurementControls from './components/MeasurementControls';
import './App.css';

function App() {
  const [image, setImage] = useState(null);          // Floor plan image
  const [scaleFactor, setScaleFactor] = useState(0); // mm per pixel
  const [measurements, setMeasurements] = useState([]); // List of measurements

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>PyraGen AI Floor Plan Scaler</h1>

      {/* Upload floor plan image */}
      <UploadZone setImage={setImage} />

      {/* Display image on canvas */}
      {image ? (
        <CanvasArea
          scaleFactor={scaleFactor}
          measurements={measurements}
          setMeasurements={setMeasurements}
          image={image} // optionally pass image if CanvasArea uses it
        />
      ) : (
        <p style={{ marginTop: '20px' }}>Upload a floor plan to get started.</p>
      )}

      {/* Controls to set scale */}
      <MeasurementControls setScaleFactor={setScaleFactor} />

      {/* Display list of measurements */}
      {measurements.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Measurements:</h3>
          <ul>
            {measurements.map((m, idx) => (
              <li key={idx}>
                From ({m.from.x}, {m.from.y}) to ({m.to.x}, {m.to.y}):{' '}
                <strong>{m.real.toFixed(2)} mm</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;