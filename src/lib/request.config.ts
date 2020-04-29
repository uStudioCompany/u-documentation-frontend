import { AxiosRequestConfig } from 'axios';

import config from '../config.json';

const serviceProtocol = 'http';
const serviceAddress = '185.25.116.133';
const servicePort = 3535;
const serviceUrl = `${serviceProtocol}://${serviceAddress}${servicePort ? `:${servicePort}` : ''}`;

export const getMarkdownFileConfig = (fileName: string): AxiosRequestConfig => ({
  method: 'get',
  url: `${serviceUrl}/entries/${config.requestParams.owner}/${config.requestParams.repo}/${fileName}.md`,
  params: {
    branch: config.requestParams.branch,
    path: config.requestParams.path,
  },
});
