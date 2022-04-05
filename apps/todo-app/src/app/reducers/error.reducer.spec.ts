import * as fromError from './error.reducer';

describe('error reducer', () => {
  const initialState = {};

  it('should handle an unknown action type', () => {
    const state = fromError.error(undefined, { type: '@@init' });

    expect(state).toEqual(initialState);
  });

  it('should handle REQUEST action types', () => {
    expect(
      fromError.error(initialState, { type: 'FETCH_TODOS_REQUEST' })
    ).toEqual({
      FETCH_TODOS: false,
    });

    expect(
      fromError.error(
        { FETCH_TODOS: false, ADD_TODO: true },
        { type: 'ADD_TODO_REQUEST' }
      )
    ).toEqual({
      FETCH_TODOS: false,
      ADD_TODO: false,
    });
  });

  it('should handle FAILURE action types', () => {
    expect(
      fromError.error({ FETCH_TODOS: false }, { type: 'FETCH_TODOS_FAILURE' })
    ).toEqual({
      FETCH_TODOS: true,
    });

    expect(
      fromError.error(
        { FETCH_TODOS: false, ADD_TODO: false },
        { type: 'ADD_TODO_FAILURE' }
      )
    ).toEqual({
      FETCH_TODOS: false,
      ADD_TODO: true,
    });
  });

  describe('selector', () => {
    describe('getError', () => {
      it('should return error states', () => {
        const state = { FETCH_TODOS: false, ADD_TODO: true };

        expect(fromError.getError(['FETCH_TODOS'])(state)).toBe(false);
        expect(fromError.getError(['ADD_TODO'])(state)).toBe(true);
      });
    });
  });
});
