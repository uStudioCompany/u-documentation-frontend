import axios from 'axios';
import { JSONSchema7 } from 'json-schema';

import { getJsonSchemeDocumentConfig } from '../../lib';
import { getDocPropsFromHref } from '../../utils';

export const getJsonSchemeDocument = async (href: string): Promise<JSONSchema7> => {
  const {
    data: { content },
  } = await axios(getJsonSchemeDocumentConfig(getDocPropsFromHref(href, 'json')));

  return JSON.parse(content);
};
