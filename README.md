# TodoExampleApp

This project was generated using [Nx](https://nx.dev).

## Assignment description

The current repository contains a single application `todo-app`. This app is a basic todo app where a user can add new todos, toggle todos and filter the view to show all/completed/remaining todos.

At the moment the application is missing a delete-todo functionality. Implement the delete-todo functionality by adding a delete button for each todo.
- Your implementation should utilize `ngrx` to match the redux pattern used in the rest of the app (actions + effects + reducers). The `ngrx` library is already included and used in the app.
- Your code should lint without any errors
- You're welcome to add unit tests and integration tests for the code you write
- It is not required to style the application, but if you decide you can leverage the `angular/material` library already included in the `package.json`

You will not have write-access to the repository. Please keep the code locally or push it to your own GitHub account.

Once you're done with your implementation, please reach out to us and set up a time to review the work together.

**_Note: this repository has been generated with Nx. No knowledge of Nx is required for the implementation. Please read below for the prerequisites and the different commands you can use to serve, lint and test your work! Good luck :)_** 

## Prerequisites

- [npm](https://www.npmjs.com/get-npm) >=6.11.3 <7
- [node](https://nodejs.org/en/download/) >=12.11.1 <13.0.0

## Quick Start

```
git clone git@github.com:PhilippeOberti/todo-example-app.git
cd todo-example-app
npm install -g @nrwl/cli@11.6.3
npm install
```

## Development server

Run `nx serve todo-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Build

Run `nx build todo-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running linting

Run `nx lint todo-app` to run the linter via [ESLint](https://eslint.org).

## Running unit tests

Run `nx test todo-app` to execute the unit tests via [Jest](https://jestjs.io).

## Running end-to-end/integration tests

Run `nx e2e todo-app-e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

### Code scaffolding

Run `nx g @nrwl/angular:component my-component --project=my-app` to generate a new component.
