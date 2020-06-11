import axios from 'axios';
import type { JSONSchema7 } from 'json-schema';

import { getJsonSchemaDocumentConfig } from '../../lib';
import { getDocPropsFromHref } from '../../utils';

export const getJsonSchemaDocument = async (href: string): Promise<JSONSchema7> => {
  const {
    data: { content },
  } = await axios(getJsonSchemaDocumentConfig(getDocPropsFromHref(href, 'schema.json')));

  return JSON.parse(content);
};
