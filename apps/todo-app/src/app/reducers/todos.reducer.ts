import { combineReducers, createReducer, on } from '@ngrx/store';
import * as TodosActions from '../actions/todos.actions';
import { Todo } from '../models/todo.model';

// The recommended approach to managing relational or nested
// data in the store is to treat a portion of your store as if
// it were a database, and keep that data in a normalized form.
// The basic concepts of normalizing data are: each type of data
// gets its own "table" in the state, each "table" should store
// the individual items in an object with the IDs of the items as
// keys and the items themselves as the values, any references to
// individual items should be done by storing the item's ID, and
// arrays of IDs should be used to indicate ordering.
// see: https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape

export interface State {
  byId: { [id: string]: Todo };
  allIds: string[];
}

const byId = createReducer(
  <{ [id: string]: Todo }>{},
  on(
    TodosActions.fetchTodosSuccess,
    TodosActions.addTodoSuccess,
    TodosActions.toggleTodoSuccess,
    (state, { payload }) => ({ ...state, ...payload.entities.todos })
  )
);

const allIds = createReducer(
  <string[]>[],
  on(TodosActions.fetchTodosSuccess, (state, { payload }) => payload.result),
  on(TodosActions.addTodoSuccess, (state, { payload }) => [
    ...state,
    payload.result,
  ])
);

export const todos = combineReducers({
  byId,
  allIds,
});

export const getAllTodos = (state: State): Todo[] =>
  state.allIds.map((id) => state.byId[id]);
