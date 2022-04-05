// see: https://angular.io/guide/testing#components-with-routerlink

// Dummy module to satisfy Angular Language service. Never used.
import { Directive, Input, NgModule } from '@angular/core';

/* eslint-disable @angular-eslint/directive-selector, @angular-eslint/no-host-metadata-property, @angular-eslint/directive-class-suffix */
@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' },
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
/* eslint-disable @angular-eslint/directive-selector, @angular-eslint/no-host-metadata-property, @angular-eslint/directive-class-suffix */

@NgModule({
  declarations: [RouterLinkDirectiveStub],
})
export class RouterStubsModule {}
