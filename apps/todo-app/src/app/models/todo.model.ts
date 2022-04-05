import { schema } from 'normalizr';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export const todo = new schema.Entity('todos');

export const arrayOfTodos = new schema.Array(todo);

export const generateMockTodo = (): Todo => ({
  id: '1',
  text: 'hey',
  completed: false,
});
