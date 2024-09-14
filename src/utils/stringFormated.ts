export const capitalFirstLetter = (text: string) => {
  const firstChar = text[0].toLocaleUpperCase();
  const remainingChars = text.slice(1);
  return firstChar + remainingChars;
};
