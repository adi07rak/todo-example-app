import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import * as TodosActions from '../../actions/todos.actions';
import { Todo } from '../../models/todo.model';
import * as fromRoot from '../../reducers/index.reducer';

// Distinguishing between container and presentational components
// provides semantic value and intentionality. Container components
// are: concerned with how things work, may contain both presentational
// and container components inside but usually don’t have any DOM
// markup of their own except for some wrapping divs and never have
// any styles, provide the data and behavior to presentational or other
// container components, call actions and provide these as callbacks to
// the presentational components, and are often stateful as they tend
// to serve as data sources.
// see: https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0

@Component({
  selector: 'todo-example-app-visible-todo-list',
  templateUrl: './visible-todo-list.component.html',
  styleUrls: ['./visible-todo-list.component.scss'],
})
export class VisibleTodoListComponent {
  visibleTodos$: Observable<Todo[]>;
  loadingTodos$: Observable<boolean>;
  todosError$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>,
    private router: ActivatedRoute
  ) {
    this.store.dispatch(TodosActions.fetchTodosRequest());
    this.visibleTodos$ = this.router.paramMap.pipe(
      switchMap((params) => {
        const todosFilter = params.get('filter');
        return store.pipe(select(fromRoot.getVisibleTodos(todosFilter)));
      })
    );
    this.loadingTodos$ = store.pipe(
      select(fromRoot.getIsLoading(['FETCH_TODOS']))
    );
    this.todosError$ = store.pipe(select(fromRoot.getError(['FETCH_TODOS'])));
  }

  toggleTodo(todo: Todo): void {
    this.store
      .pipe(
        select(fromRoot.getIsLoading(['TOGGLE_TODO'])),
        first(),
        filter((isLoading) => !isLoading)
      )
      .subscribe(() =>
        this.store.dispatch(
          TodosActions.toggleTodoRequest({
            ...todo,
            completed: !todo.completed,
          })
        )
      );
  }
}
