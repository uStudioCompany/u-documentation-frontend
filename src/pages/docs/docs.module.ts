import axios from 'axios';

import { getMarkdownFileConfig } from '../../lib';
import config from '../../config.json';

export const kebabToHumanCase = (string: string): string => {
  const noDashString = string.replace(/-/, ' ');

  return `${noDashString.slice(0, 1).toUpperCase()}${noDashString.slice(1)}`;
};

export const getMarkdownFile = async (fileName: string): Promise<string> => {
  const {
    data: { content: source },
  } = await axios(getMarkdownFileConfig(config.requestParams.owner, config.requestParams.repo, fileName));

  return source;
};
