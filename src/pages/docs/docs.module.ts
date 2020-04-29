import fs from 'fs';

export const kebabToHumanCase = (string: string): string => {
  const noDashString = string.replace(/-/, ' ');

  return `${noDashString.slice(0, 1).toUpperCase()}${noDashString.slice(1)}`;
};

export const getMarkdownFile = (fileName: string): string => {
  return fs.readFileSync(`../../docs/${fileName}.md`, { encoding: 'utf8' });
};
