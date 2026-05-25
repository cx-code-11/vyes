/**
 * Dynamically converts an image URL (such as JPEG with white background)
 * to a transparent PNG data URL in the browser.
 */
export const makeImageTransparent = (imgUrl, threshold = 190) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imgUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Loop through all pixels (R, G, B, A)
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // If the pixel is close to white/grey background, make it transparent
        if (r > threshold && g > threshold && b > threshold) {
          data[i + 3] = 0; // Set Alpha to 0 (transparent)
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => {
      resolve(imgUrl); // Fallback to original URL
    };
  });
};
