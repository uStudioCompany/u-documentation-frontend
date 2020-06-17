export const kebabToHumanCase = (string: string): string => {
  const noDashString = string.replace(/-/, ' ');

  return `${noDashString.slice(0, 1).toUpperCase()}${noDashString.slice(1)}`;
};
