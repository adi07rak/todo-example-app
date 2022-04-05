import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';

import { TodoFormComponent } from './todo-form.component';
import * as TodosActions from '../../actions/todos.actions';
import * as fromRoot from '../../reducers/index.reducer';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let store: Store<fromRoot.State>;
  let button: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TodoFormComponent],
        imports: [
          FormsModule,
          StoreModule.forRoot(fromRoot.reducers, {
            runtimeChecks: {
              strictStateImmutability: true,
              strictActionImmutability: true,
            },
          }),
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    store = TestBed.inject(Store);
    jest.spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('button');
  });

  it('should dispatch an action to add a todo', () => {
    const text = 'hey';
    const action = TodosActions.addTodoRequest({ text, completed: false });

    component.value = text;
    button.click();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should clear input after button click', () => {
    component.value = 'hey';
    button.click();

    expect(component.value).toBe('');
  });
});
