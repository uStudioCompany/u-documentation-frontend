import { AxiosRequestConfig } from 'axios';

import { repo } from '../../config.json';

const { owner, name, branch, docsFolder, csvFolder } = repo;
const serviceUrl = `http://185.25.116.133:3535`;

export interface DocProps {
  path: string;
  docName: string;
}

const prependPath = (path?: string): string => (path ? `%2F${path}` : '');

export const getMarkdownDocumentConfig = ({ path, docName }: DocProps): AxiosRequestConfig => ({
  method: 'get',
  url: `${serviceUrl}/entries/${owner}/${name}/${branch}/${encodeURI(docsFolder)}${prependPath(path)}/${docName}.md`,
});

export const getCsvDocumentConfig = ({ path, docName }: DocProps): AxiosRequestConfig => ({
  method: 'get',
  url: `${serviceUrl}/entries/${owner}/${name}/${branch}/${encodeURI(csvFolder)}${prependPath(path)}/${docName}.csv`,
});
