export const colorConverter = (value) => {
  const rgb = value.match(/\d+/g).map(Number);
  return [...rgb, 1];
};
