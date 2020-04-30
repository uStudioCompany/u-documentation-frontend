import axios from 'axios';

import { getMarkdownListConfig } from '../../lib';
import { Node } from '../../types';

export const getMarkdownList = async (path: string): Promise<Node[]> => {
  const { data } = await axios(getMarkdownListConfig(path));

  return data;
};
