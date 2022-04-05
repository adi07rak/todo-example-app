import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';

import { VisibleTodoListComponent } from './visible-todo-list.component';
import * as TodosActions from '../../actions/todos.actions';
import { generateMockTodo } from '../../models/todo.model';
import * as fromRoot from '../../reducers/index.reducer';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';

// A component, unlike all other parts of an Angular
// application, combines a HTML template and a TypeScript
// class. The component truly is the template and the class
// working together, and to adequately test a component, you
// should test that they work together as intended.
// see: https://v11.angular.io/guide/testing#component-test-basics

// Some components, containers in particular, are store aware.
// These components may require testing @ngrx/store integration.
// see: https://v11.ngrx.io/guide/store/testing

describe('VisibleTodoListComponent', () => {
  let component: VisibleTodoListComponent;
  let fixture: ComponentFixture<VisibleTodoListComponent>;
  let store: Store<fromRoot.State>;
  let activedRouteStub: ActivatedRouteStub;
  const todo = generateMockTodo();

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VisibleTodoListComponent],
        schemas: [NO_ERRORS_SCHEMA],
        imports: [
          StoreModule.forRoot(fromRoot.reducers, {
            runtimeChecks: {
              strictStateImmutability: true,
              strictActionImmutability: true,
            },
          }),
        ],
        providers: [
          { provide: ActivatedRoute, useValue: new ActivatedRouteStub() },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    store = TestBed.inject(Store);
    activedRouteStub = TestBed.inject(ActivatedRoute) as any;
    jest.spyOn(store, 'dispatch');
    activedRouteStub.setParamMap({ filter: 'all' });
    fixture = TestBed.createComponent(VisibleTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should dispatch an action to fetch todos when created', () => {
    const action = TodosActions.fetchTodosRequest();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch an action to toggle a todo', () => {
    const action = TodosActions.toggleTodoRequest({
      ...todo,
      completed: !todo.completed,
    });

    component.toggleTodo(todo);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
