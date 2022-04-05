import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromError from './error.reducer';
import * as fromLoading from './loading.reducer';
import * as fromTodos from './todos.reducer';
import { Todo } from '../models/todo.model';

export interface State {
  todos: fromTodos.State;
  loading: fromLoading.State;
  error: fromError.State;
}

export const reducers: ActionReducerMap<State> = {
  todos: fromTodos.todos,
  loading: fromLoading.loading,
  error: fromError.error,
};

export const getTodosState = createFeatureSelector<fromTodos.State>('todos');

export const getLoadingState = createFeatureSelector<fromLoading.State>(
  'loading'
);

export const getErrorState = createFeatureSelector<fromError.State>('error');

export const getAllTodos = createSelector(getTodosState, fromTodos.getAllTodos);

export const getVisibleTodos = (filter: string) =>
  createSelector(getAllTodos, (allTodos: Todo[]) => {
    switch (filter) {
      case 'all':
        return allTodos;
      case 'active':
        return allTodos.filter((t) => !t.completed);
      case 'completed':
        return allTodos.filter((t) => t.completed);
      default:
        throw new Error(`Unknown filter: ${filter}.`);
    }
  });

export const getIsLoading = (actionTypes: string[]) =>
  createSelector(getLoadingState, fromLoading.getIsLoading(actionTypes));

export const getError = (actionTypes: string[]) =>
  createSelector(getErrorState, fromError.getError(actionTypes));
