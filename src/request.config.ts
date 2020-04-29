import { AxiosRequestConfig } from 'axios';

const serviceProtocol = 'http';
const serviceAddress = '185.25.116.133';
const servicePort = 3535;
const serviceURL = `${serviceProtocol}://${serviceAddress}:${servicePort}`;

export const getMarkdownFileConfig = (...[owner, repo, fileName]: [string, string, string]): AxiosRequestConfig => ({
  method: 'get',
  url: `${serviceURL}/entries/${owner}/${repo}/${fileName}.md`,
  params: {
    branch: 'develop',
    path: 'info',
  },
});

export const getMarkdownListConfig = (...[owner, repo, path]: [string, string, string]): AxiosRequestConfig => ({
  method: 'get',
  url: `${serviceURL}/entries/${owner}/${repo}`,
  params: {
    branch: 'master',
    path,
  },
});
