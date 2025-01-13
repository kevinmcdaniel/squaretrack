// utilitiy funcitons

export const isNumeric = (iString: string): boolean => {
  const numbericValue = parseFloat(iString);
  if (isNaN(numbericValue)) {
    return false;
  } else if (numbericValue === null) {
    return false;
  } else if (numbericValue === undefined) {
    return false;
  } else if (numbericValue.toString().length !== iString.length) {
    return false;
  } else {
    return true;
  }
};
