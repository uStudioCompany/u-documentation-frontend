import { repo } from '../../../../config.json';

export interface RequestConfigProps {
  repo: typeof repo;
  serviceUrl: string;
}
