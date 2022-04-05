import * as fromLoading from './loading.reducer';

describe('loading reducer', () => {
  const initialState = {};

  it('should handle an unknown action type', () => {
    const state = fromLoading.loading(undefined, { type: '@@init' });

    expect(state).toEqual(initialState);
  });

  it('should handle REQUEST action types', () => {
    expect(
      fromLoading.loading(initialState, { type: 'FETCH_TODOS_REQUEST' })
    ).toEqual({
      FETCH_TODOS: true,
    });

    expect(
      fromLoading.loading(
        { FETCH_TODOS: false, ADD_TODO: false },
        { type: 'ADD_TODO_REQUEST' }
      )
    ).toEqual({
      FETCH_TODOS: false,
      ADD_TODO: true,
    });
  });

  it('should handle SUCCESS action types', () => {
    expect(
      fromLoading.loading(
        { FETCH_TODOS: true },
        { type: 'FETCH_TODOS_SUCCESS' }
      )
    ).toEqual({
      FETCH_TODOS: false,
    });

    expect(
      fromLoading.loading(
        { FETCH_TODOS: false, ADD_TODO: true },
        { type: 'ADD_TODO_SUCCESS' }
      )
    ).toEqual({
      FETCH_TODOS: false,
      ADD_TODO: false,
    });
  });

  it('should handle FAILURE action types', () => {
    expect(
      fromLoading.loading(
        { FETCH_TODOS: true },
        { type: 'FETCH_TODOS_FAILURE' }
      )
    ).toEqual({
      FETCH_TODOS: false,
    });

    expect(
      fromLoading.loading(
        { FETCH_TODOS: false, ADD_TODO: true },
        { type: 'ADD_TODO_FAILURE' }
      )
    ).toEqual({
      FETCH_TODOS: false,
      ADD_TODO: false,
    });
  });

  describe('selector', () => {
    describe('getIsLoading', () => {
      it('should return loading states', () => {
        const state = { FETCH_TODOS: false, ADD_TODO: true };

        expect(fromLoading.getIsLoading(['FETCH_TODOS'])(state)).toBe(false);
        expect(fromLoading.getIsLoading(['ADD_TODO'])(state)).toBe(true);
      });
    });
  });
});
