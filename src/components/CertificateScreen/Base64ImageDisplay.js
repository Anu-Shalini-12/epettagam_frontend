import React from 'react';

const Base64ImageDisplay = ({ base64Data }) => {
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust the MIME type if needed
  const imageUrl = URL.createObjectURL(blob);


  return (
    <div>
      <img src={imageUrl} alt="Base64 Image" />
    </div>
  );
};

export default Base64ImageDisplay;
