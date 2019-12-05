export const loadImage = async (url) => {
  const obj = await fetch(url);
  const blob = await obj.blob();
  const objURL = URL.createObjectURL(blob);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Loading image failed'));
    img.src = objURL;
  });
};

export const imageToDataUrl = (img) => {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  canvas.getContext('2d').drawImage(img, 0, 0);

  // Get raw image data
  return canvas.toDataURL('image/jpeg');
};

export const dataUrlToImage = dataUrl => new Promise((resolve, reject) => {
  const img = new Image();
  img.onload = () => resolve(img);
  img.onerror = () => reject(new Error('Loading image failed'));
  img.src = dataUrl;
});
