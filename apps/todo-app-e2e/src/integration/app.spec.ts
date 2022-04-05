// These tests are integration tests. They aren't true E2E tests because
// the network requests are stubbed. Stubbing network requests allows us
// to test the front-end without needing the back-end connected. It also
// makes it easy to test scenarios that can be difficult to set up, like
// error conditions from the server. Because of their flexibility and the
// fact that stubs are relatively light-weight, integration tests should
// make up the majority of your tests.
// see: https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell

describe('App', () => {
  const getTodos = () => cy.get('[data-cy=todo]');

  beforeEach(() => cy.server());

  it('should load all todos', () => {
    cy.route('GET', '/api/todos', 'fixture:todos');
    cy.visit('/');

    cy.get('[data-cy=loading-message]').should('be.visible');
    getTodos().should('have.length', 3);
  });

  it('should display an error message on failure', () => {
    cy.server();
    cy.route({
      url: 'api/todos',
      method: 'GET',
      status: 500,
      response: {},
    });
    cy.visit('/');

    cy.get('[data-cy=todo-list]').should('not.exist');
    cy.get('[data-cy=error-message]').should('be.visible');
  });

  it('should add a todo', () => {
    cy.route('GET', '/api/todos', []);
    cy.visit('/');

    cy.fixture('todos').then((todos) => {
      const [todo]: any = todos;
      cy.route('POST', 'api/todos', todo);

      cy.get('[data-cy=todo-input]').as('todo-input').type(todo.text);
      cy.get('[data-cy=submit]').click();

      cy.get('@todo-input').should('have.value', '');
      getTodos().should('have.length', 1).and('contain', todo.text);
    });
  });

  it('should handle filter links', () => {
    cy.route('GET', '/api/todos', 'fixture:todos');
    cy.visit('/');

    const filters = [
      { link: '/active', expectedStyle: 'none', expectedLength: 2 },
      { link: '/completed', expectedStyle: 'line-through', expectedLength: 1 },
      { link: '/all', expectedStyle: 'none', expectedLength: 3 },
    ];

    cy.wrap(filters).each((filter: any) => {
      cy.get(`a[href^="${filter.link}"]`).click();
      getTodos()
        .should('have.css', 'text-decoration-line', filter.expectedStyle)
        .and('have.length', filter.expectedLength);
    });
  });

  it('should toggle a todo', () => {
    cy.route('GET', '/api/todos', 'fixture:todos');
    cy.visit('/');

    cy.fixture('todos').then((todos) => {
      const [todo] = todos;
      cy.route('PUT', 'api/todos', { ...todo, completed: true });
    });

    getTodos().first().as('list-item');

    cy.get('@list-item').should('have.css', 'text-decoration-line', 'none');

    cy.get('@list-item').click();

    cy.get('@list-item').should(
      'have.css',
      'text-decoration-line',
      'line-through'
    );
  });
});
