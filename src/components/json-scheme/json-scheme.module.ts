import axios from 'axios';
import $RefParser from '@apidevtools/json-schema-ref-parser';
import { JSONSchema4 } from 'json-schema';

import { DocProps, getJsonSchemeDocumentConfig } from '../../lib';
import { encodePath } from '../../utils';

export const getDocPropsFromHref = (href: string): DocProps => {
  const matchedPath = href.match(/(?:\/).+(?=\.json)/) as [string];
  const matchedPathArray = matchedPath[0].split('/');

  return {
    path: encodePath(matchedPathArray.slice(1, -1).join('/')),
    docName: matchedPathArray.slice(-1)[0],
  };
};


export const getJsonSchemeDocument = async (href: string): Promise<JSONSchema4> => {
  const {
    data: { content },
  } = await axios(getJsonSchemeDocumentConfig(getDocPropsFromHref(href)));

  const parsed = await $RefParser.dereference(JSON.parse(content));

  return parsed as JSONSchema4;
};
