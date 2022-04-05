import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TodosActions from '../../actions/todos.actions';
import { State } from '../../reducers/index.reducer';

@Component({
  selector: 'todo-example-app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent {
  value = '';

  constructor(private store: Store<State>) {}

  addTodo(text: string): void {
    this.store.dispatch(
      TodosActions.addTodoRequest({ text, completed: false })
    );
    this.value = '';
  }
}
