import React from 'react';

const UploadZone = ({ setImage }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!['image/png','image/jpeg'].includes(file.type)) {
      alert('Only JPG or PNG allowed');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('File too large (max 10MB)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} />;
};

export default UploadZone;