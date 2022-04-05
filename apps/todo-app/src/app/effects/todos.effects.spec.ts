import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { TodosEffects } from './todos.effects';
import * as TodosActions from '../actions/todos.actions';
import { generateMockTodo } from '../models/todo.model';
import { Mock, provideMagicalMock } from '../../testing/service-mock';

// Effects provide new sources of actions to reduce state
// based on external interactions such as network requests,
// web socket messages, and time-based events. Effects tests
// should determine that an effect returns the expected
// actions to reduce state.
// see: https://v11.ngrx.io/guide/effects/testing

// These tests use marble diagrams to visually represent
// observables. To learn more about marble diagrams, checkout
// https://www.youtube.com/watch?v=dwDtMs4mN48.

describe('TodosEffects', () => {
  let effects: TodosEffects;
  let actions$: Observable<any>;
  let http: Mock<HttpClient>;
  const todo1 = generateMockTodo();
  const todo2 = { ...todo1, id: '2' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodosEffects,
        provideMockActions(() => actions$),
        provideMagicalMock(HttpClient),
      ],
    });

    effects = TestBed.inject(TodosEffects);
    http = TestBed.inject(HttpClient) as Mock<HttpClient>;
  });

  it('should return FetchTodosSuccess', () => {
    const payload = {
      entities: {
        todos: {
          [todo1.id]: todo1,
          [todo2.id]: todo2,
        },
      },
      result: [todo1.id, todo2.id],
    };
    const action = TodosActions.fetchTodosRequest();
    const completion = TodosActions.fetchTodosSuccess(payload);

    actions$ = hot('-a', { a: action });
    const response = cold('-b|', { b: [todo1, todo2] });
    const expected = cold('--c', { c: completion });
    http.get.mockReturnValue(response);

    expect(effects.fetchTodos$).toBeObservable(expected);
  });

  it('should return FetchTodosFailure', () => {
    const action = TodosActions.fetchTodosRequest();
    const completion = TodosActions.fetchTodosFailure();

    actions$ = hot('-a', { a: action });
    const response = cold('-#|');
    const expected = cold('--b', { b: completion });
    http.get.mockReturnValue(response);

    expect(effects.fetchTodos$).toBeObservable(expected);
  });

  it('should return AddTodoSuccess', () => {
    const payload = {
      entities: {
        todos: {
          [todo1.id]: todo1,
        },
      },
      result: todo1.id,
    };
    const action = TodosActions.addTodoRequest({
      text: todo1.text,
      completed: false,
    });
    const completion = TodosActions.addTodoSuccess(payload);

    actions$ = hot('-a', { a: action });
    const response = cold('-b|', { b: todo1 });
    const expected = cold('--c', { c: completion });
    http.post.mockReturnValue(response);

    expect(effects.addTodo$).toBeObservable(expected);
  });

  it('should return AddTodoFailure', () => {
    const action = TodosActions.addTodoRequest({
      text: todo1.text,
      completed: false,
    });
    const completion = TodosActions.addTodoFailure();

    actions$ = hot('-a', { a: action });
    const response = cold('-#|');
    const expected = cold('--b', { b: completion });
    http.post.mockReturnValue(response);

    expect(effects.addTodo$).toBeObservable(expected);
  });

  it('should return ToggleTodoSuccess', () => {
    const payload = {
      entities: {
        todos: {
          [todo1.id]: {
            ...todo1,
            completed: !todo1.completed,
          },
        },
      },
      result: todo1.id,
    };
    const action = TodosActions.toggleTodoRequest(todo1);
    const completion = TodosActions.toggleTodoSuccess(payload);

    actions$ = hot('-a', { a: action });
    const response = cold('-b|', {
      b: { ...todo1, completed: !todo1.completed },
    });
    const expected = cold('--c', { c: completion });
    http.put.mockReturnValue(response);

    expect(effects.toggleTodo$).toBeObservable(expected);
  });

  it('should return ToggleTodoFailure', () => {
    const action = TodosActions.toggleTodoRequest(todo1);
    const completion = TodosActions.toggleTodoFailure();

    actions$ = hot('-a', { a: action });
    const response = cold('-#|');
    const expected = cold('--b', { b: completion });
    http.put.mockReturnValue(response);

    expect(effects.toggleTodo$).toBeObservable(expected);
  });
});
