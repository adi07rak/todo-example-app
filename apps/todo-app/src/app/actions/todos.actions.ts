import { createAction } from '@ngrx/store';
import {
  NormalizedEntities,
  NormalizedEntity,
} from '../models/normalized-entities.model';
import { Todo } from '../models/todo.model';

export const fetchTodosRequest = createAction('FETCH_TODOS_REQUEST');

export const fetchTodosSuccess = createAction(
  'FETCH_TODOS_SUCCESS',
  (payload: NormalizedEntities<Todo>) => ({ payload })
);

export const fetchTodosFailure = createAction('FETCH_TODOS_FAILURE');

export const addTodoRequest = createAction(
  'ADD_TODO_REQUEST',
  (payload: { text: string; completed: boolean }) => ({ payload })
);

export const addTodoSuccess = createAction(
  'ADD_TODO_SUCCESS',
  (payload: NormalizedEntity<Todo>) => ({ payload })
);

export const addTodoFailure = createAction('ADD_TODO_FAILURE');

export const toggleTodoRequest = createAction(
  'TOGGLE_TODO_REQUEST',
  (payload: Todo) => ({ payload })
);

export const toggleTodoSuccess = createAction(
  'TOGGLE_TODO_SUCCESS',
  (payload: NormalizedEntity<Todo>) => ({ payload })
);

export const toggleTodoFailure = createAction('TOGGLE_TODO_FAILURE');
