export const isSingleWord = (arg: string | string[]): arg is string => {
  if (typeof arg === 'string') {
    return true;
  }
  return false;
};
