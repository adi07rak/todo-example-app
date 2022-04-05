import { InMemoryDbService } from 'angular-in-memory-web-api';
import { v4 } from 'uuid';

// This service replaces the HttpClient module's HttpBackend and
// simulates the behavior of a REST-like backend.
// see: https://github.com/angular/in-memory-web-api/blob/master/README.md

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos = [
      {
        id: v4(),
        text: 'hey',
        completed: false,
      },
      {
        id: v4(),
        text: 'ho',
        completed: true,
      },
      {
        id: v4(),
        text: "let's go",
        completed: false,
      },
    ];

    return { todos };
  }

  genId() {
    return v4();
  }
}
