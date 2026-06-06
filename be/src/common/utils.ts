// utilitiy funcitons

// Express 5 types `req.params[key]` as `string | string[]` (repeated-param
// support). Our routes only use single-value params, so collapse to a string.
export const routeParam = (value: string | string[] | undefined): string =>
  Array.isArray(value) ? (value[0] ?? '') : (value ?? '');

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
