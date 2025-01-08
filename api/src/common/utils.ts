// utilitiy funcitons

export const isNumeric = (iString: string): boolean => {
  const numbericValue = parseFloat(iString);
  if (isNaN(numbericValue)) {
    return false;
  }
  if (numbericValue.toString().length !== iString.length) {
    return false;
  }
  return true;
};
