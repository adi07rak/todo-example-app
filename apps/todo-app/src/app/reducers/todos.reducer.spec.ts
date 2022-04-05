import * as fromTodos from './todos.reducer';
import * as TodosActions from '../actions/todos.actions';
import { generateMockTodo } from '../models/todo.model';

// Each action that passes through your reducers
// (actions provided to the "on" ngrx function)
// should be tested in addition to a test that
// determines that state is returned unmodifed when
// the reducer is given an unknown action type.
// see: https://redux.js.org/recipes/writing-tests#reducers

describe('todos reducer', () => {
  const initialState = {
    byId: {},
    allIds: [],
  };
  const todo1 = generateMockTodo();
  const todo2 = { ...todo1, id: '2' };

  it('should handle an unknown action type', () => {
    const state = fromTodos.todos(undefined, { type: '@@init' });

    expect(state).toEqual(initialState);
  });

  it('should handle FETCH_TODOS_SUCCESS', () => {
    expect(
      fromTodos.todos(
        initialState,
        TodosActions.fetchTodosSuccess({
          entities: {
            todos: {
              [todo1.id]: todo1,
              [todo2.id]: todo2,
            },
          },
          result: [todo1.id, todo2.id],
        })
      )
    ).toEqual({
      byId: {
        [todo1.id]: todo1,
        [todo2.id]: todo2,
      },
      allIds: [todo1.id, todo2.id],
    });
  });

  it('should handle ADD_TODO_SUCCESS', () => {
    expect(
      fromTodos.todos(
        initialState,
        TodosActions.addTodoSuccess({
          entities: {
            todos: {
              [todo1.id]: todo1,
            },
          },
          result: todo1.id,
        })
      )
    ).toEqual({
      byId: {
        [todo1.id]: todo1,
      },
      allIds: [todo1.id],
    });

    expect(
      fromTodos.todos(
        {
          byId: {
            [todo1.id]: todo1,
          },
          allIds: [todo1.id],
        },
        TodosActions.addTodoSuccess({
          entities: {
            todos: {
              [todo2.id]: todo2,
            },
          },
          result: todo2.id,
        })
      )
    ).toEqual({
      byId: {
        [todo1.id]: todo1,
        [todo2.id]: todo2,
      },
      allIds: [todo1.id, todo2.id],
    });
  });

  it('should handle TOGGLE_TODO_SUCCESS', () => {
    expect(
      fromTodos.todos(
        {
          byId: {
            [todo1.id]: todo1,
            [todo2.id]: todo2,
          },
          allIds: [todo1.id, todo2.id],
        },
        TodosActions.toggleTodoSuccess({
          entities: {
            todos: {
              [todo1.id]: {
                ...todo1,
                completed: !todo1.completed,
              },
            },
          },
          result: todo1.id,
        })
      )
    ).toEqual({
      byId: {
        [todo1.id]: {
          ...todo1,
          completed: !todo1.completed,
        },
        [todo2.id]: todo2,
      },
      allIds: [todo1.id, todo2.id],
    });
  });

  describe('selector', () => {
    describe('getAllTodos', () => {
      it('should return all todos', () => {
        const state = {
          byId: {
            [todo1.id]: todo1,
            [todo2.id]: todo2,
          },
          allIds: [todo1.id, todo2.id],
        };

        expect(fromTodos.getAllTodos(state)).toEqual([todo1, todo2]);
      });
    });
  });
});
