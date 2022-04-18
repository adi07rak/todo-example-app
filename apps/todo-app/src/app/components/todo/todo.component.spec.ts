import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import { generateMockTodo } from '../../models/todo.model';
import { Store, StoreModule } from '@ngrx/store';
import * as fromRoot from '../../reducers/index.reducer';
import { MatIconModule } from '@angular/material/icon';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let li: HTMLElement;
  let store: Store<fromRoot.State>;
  const todo = generateMockTodo();

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TodoComponent],
        imports: [
          MatIconModule,
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
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    component.todo = todo;
    li = fixture.nativeElement.querySelector('li');
  });

  it('should display todo text', () => {
    fixture.detectChanges();

    expect(li.textContent).toContain(todo.text);
  });

  it('should emit todo when clicked', () => {
    component.todo = todo;
    fixture.detectChanges();

    component.toggleTodo.subscribe((toggledTodo) =>
      expect(toggledTodo).toEqual(todo)
    );

    li.click();
  });

  it('should style todo with no text decoration', () => {
    component.todo = todo;
    fixture.detectChanges();

    expect(li.style.textDecoration).toBe('none');
  });

  it('should style todo with text decoration', () => {
    component.todo.completed = true;
    fixture.detectChanges();

    expect(li.style.textDecoration).toBe('line-through');
  });

  it('should dispatch event to delete', () => {
    const storeSpy = spyOn(store, 'dispatch');
    component.removeOne('MOCK_ID');
    expect(storeSpy).toHaveBeenCalled();
  });
});
