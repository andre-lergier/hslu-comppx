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

// optimize image size: resize to w:512
export const resizeImage = (img, targetWidth, targetHeight) => {
  const canvas = document.createElement('canvas');
  const scale = img.originalWidth / 512; // todo: provide fallback if there is no originalWidth
  canvas.width = targetWidth || img.naturalWidth / scale;
  canvas.height = targetHeight || img.naturalHeight / scale;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg');
};
