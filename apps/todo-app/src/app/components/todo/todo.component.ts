import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from '../../models/todo.model';
import { State } from '../../reducers/index.reducer';
import * as TodosActions from '../../actions/todos.actions';

@Component({
  selector: 'todo-example-app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  @Input() todo: Todo;
  @Output() toggleTodo = new EventEmitter<Todo>();

  constructor(private store: Store<State>) {}
  
  public removeOne(todo) {
    this.store.dispatch(
      TodosActions.deleteTodoRequest(todo)
    );
  }
}
