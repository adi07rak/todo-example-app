import * as fromRoot from './index.reducer';
import { generateMockTodo } from '../models/todo.model';

describe('root reducer', () => {
  const todo1 = generateMockTodo();
  const todo2 = { ...todo1, id: '2', completed: !todo1.completed };

  describe('selector', () => {
    describe('getVisibleTodos', () => {
      it('should return all todos', () => {
        const result = fromRoot
          .getVisibleTodos('all')
          .projector([todo1, todo2]);

        expect(result).toEqual([todo1, todo2]);
      });

      it('should return active todos', () => {
        const result = fromRoot
          .getVisibleTodos('active')
          .projector([todo1, todo2]);

        expect(result).toEqual([todo1]);
      });

      it('should return completed todos', () => {
        const result = fromRoot
          .getVisibleTodos('completed')
          .projector([todo1, todo2]);

        expect(result).toEqual([todo2]);
      });
    });
  });
});
