import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { normalize } from 'normalizr';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as TodosActions from '../actions/todos.actions';
import * as schema from '../models/todo.model';
import { Todo } from '../models/todo.model';

// Note: normalizr is used to keep the fake API as minimal as
// possible. Prefer normalizing API responses on the back-end.

// normalizr is used to normalize API responses. By normalizing
// API responses, we are able to keep our reducers clear of
// special cases for handling different response shapes.
// see: https://github.com/paularmstrong/normalizr

@Injectable()
export class TodosEffects {
  fetchTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.fetchTodosRequest),
      switchMap(() =>
        this.http.get('api/todos').pipe(
          map((todos: Todo[]) =>
            TodosActions.fetchTodosSuccess(
              normalize(todos, schema.arrayOfTodos)
            )
          ),
          catchError(() => of(TodosActions.fetchTodosFailure()))
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.addTodoRequest),
      mergeMap(({ payload }) =>
        this.http.post('api/todos', payload).pipe(
          map((todo: Todo) =>
            TodosActions.addTodoSuccess(normalize(todo, schema.todo))
          ),
          catchError(() => of(TodosActions.addTodoFailure()))
        )
      )
    )
  );

  toggleTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.toggleTodoRequest),
      mergeMap(({ payload }) =>
        this.http.put('api/todos', payload).pipe(
          map((updatedTodo: Todo) =>
            TodosActions.toggleTodoSuccess(normalize(updatedTodo, schema.todo))
          ),
          catchError(() => of(TodosActions.toggleTodoFailure()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
