import { Component, Input } from '@angular/core';

@Component({
  selector: 'todo-example-app-filter-link',
  templateUrl: './filter-link.component.html',
  styleUrls: ['./filter-link.component.scss'],
})
export class FilterLinkComponent {
  @Input() filter: string;
}
