export default async (url) => {
  const obj = await fetch(url);
  const blob = await obj.blob();
  const objURL = URL.createObjectURL(blob);
  const img = new Image();
  img.src = objURL;
  return img;
};
