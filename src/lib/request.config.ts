import { AxiosRequestConfig } from 'axios';

import config from '../config.json';

const serviceProtocol = 'http';
const serviceAddress = '185.25.116.133';
const servicePort = 3535;
const serviceUrl = `${serviceProtocol}://${serviceAddress}${servicePort ? `:${servicePort}` : ''}`;

export const getMarkdownFileConfig = (fileName: string): AxiosRequestConfig => ({
  method: 'get',
  url: `${serviceUrl}/entries/${config.repo.owner}/${config.repo.name}/${config.repo.branch}/${config.repo.docsFolder}/${fileName}.md`,
});
