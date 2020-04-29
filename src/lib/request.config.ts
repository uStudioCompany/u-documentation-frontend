import { AxiosRequestConfig } from 'axios';

const serviceProtocol = 'http';
const serviceAddress = '185.25.116.133';
const servicePort = 3535;
const serviceUrl = `${serviceProtocol}://${serviceAddress}${servicePort ? `:${servicePort}` : ''}`;

const params = {
  branch: 'develop',
  path: 'info',
} as const;

export const getMarkdownFileConfig = (...[owner, repo, fileName]: [string, string, string]): AxiosRequestConfig => ({
  method: 'get',
  url: `${serviceUrl}/entries/${owner}/${repo}/${fileName}.md`,
  params,
});
