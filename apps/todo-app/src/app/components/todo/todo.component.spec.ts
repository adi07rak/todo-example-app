import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import { generateMockTodo } from '../../models/todo.model';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let li: HTMLElement;
  const todo = generateMockTodo();

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TodoComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
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
});
