export const loadImage = async (url) => {
  const obj = await fetch(url);
  const blob = await obj.blob();
  const objURL = URL.createObjectURL(blob);
  const img = new Image();
  img.src = objURL;
  return img;
};

export const dataUrlFromImage = (img) => {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  canvas.getContext('2d').drawImage(img, 0, 0);

  // Get raw image data
  return canvas.toDataURL('image/jpeg');
};
