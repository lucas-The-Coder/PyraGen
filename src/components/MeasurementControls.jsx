import React, { useState } from 'react';

const MeasurementControls = ({ setScaleFactor }) => {
  const [realDistance, setRealDistance] = useState('');

  const handleSetScale = () => {
    const val = parseFloat(realDistance);
    if (!val || val <= 0) {
      alert('Enter valid real-world distance in mm');
      return;
    }
    setScaleFactor(val);
    alert(`Scale set: ${val} mm per pixel`);
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <input
        type="number"
        placeholder="Real-world distance (mm)"
        value={realDistance}
        onChange={(e) => setRealDistance(e.target.value)}
      />
      <button onClick={handleSetScale}>Set Scale</button>
    </div>
  );
};

export default MeasurementControls;