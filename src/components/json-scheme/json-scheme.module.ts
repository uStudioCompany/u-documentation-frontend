import axios from 'axios';
import { JSONSchema7 } from 'json-schema';

import { DocProps, getJsonSchemeDocumentConfig } from '../../lib';
import { encodePath } from '../../utils';

export const getDocPropsFromHref = (href: string, extension: string): DocProps => {
  const path = new RegExp(`(?:/).+(?=.${extension})`);
  const matchedPath = href.match(path) as [string];
  const matchedPathArray = matchedPath[0].split('/');

  return {
    path: encodePath(matchedPathArray.slice(1, -1).join('/')),
    docName: matchedPathArray.slice(-1)[0],
  };
};

export const getJsonSchemeDocument = async (href: string): Promise<JSONSchema7> => {
  const {
    data: { content },
  } = await axios(getJsonSchemeDocumentConfig(getDocPropsFromHref(href, 'json')));

  return content;
};
