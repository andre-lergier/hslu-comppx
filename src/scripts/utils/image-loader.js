export default async (url) => {
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
