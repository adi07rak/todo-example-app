import { InMemoryDbService } from 'angular-in-memory-web-api';

export const isCypress = !!(window as any).Cypress;

export class NoopInMemoryDataService implements InMemoryDbService {
  createDb() {
    return {};
  }
}
