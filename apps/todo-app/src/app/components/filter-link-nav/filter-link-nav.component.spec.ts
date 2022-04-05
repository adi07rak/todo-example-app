import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { FilterLinkNavComponent } from './filter-link-nav.component';
import { FilterLinkComponent } from '../filter-link/filter-link.component';
import { RouterLinkDirectiveStub } from '../../../testing/router-link-directive-stub';

describe('FilterLinkNavComponent', () => {
  let fixture: ComponentFixture<FilterLinkNavComponent>;
  let linkDes: DebugElement[];
  let routerLinks: RouterLinkDirectiveStub[];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          FilterLinkNavComponent,
          FilterLinkComponent,
          RouterLinkDirectiveStub,
        ],
        imports: [RouterTestingModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterLinkNavComponent);
    fixture.detectChanges();
    linkDes = fixture.debugElement.queryAll(
      By.directive(RouterLinkDirectiveStub)
    );
    routerLinks = linkDes.map((de) => de.injector.get(RouterLinkDirectiveStub));
  });

  it('should display links', () => {
    expect(linkDes.length).toBe(3);
    expect(linkDes[0].nativeElement.textContent).toBe('All');
    expect(linkDes[1].nativeElement.textContent).toBe('Active');
    expect(linkDes[2].nativeElement.textContent).toBe('Completed');
  });

  it('should get router links from template', () => {
    expect(routerLinks.length).toBe(3);
    expect(routerLinks[0].linkParams).toBe('all');
    expect(routerLinks[1].linkParams).toBe('active');
    expect(routerLinks[2].linkParams).toBe('completed');
  });
});
