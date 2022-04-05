import { HttpClientModule } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  DefaultRouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { FilterLinkComponent } from './components/filter-link/filter-link.component';
import { FilterLinkNavComponent } from './components/filter-link-nav/filter-link-nav.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFormComponent } from './containers/todo-form/todo-form.component';
import { VisibleTodoListComponent } from './containers/visible-todo-list/visible-todo-list.component';
import { effects } from './effects/index.effects';
import * as fromRoot from './reducers/index.reducer';
import { InMemoryDataService } from './services/in-memory-data.service';
import {
  isCypress,
  NoopInMemoryDataService,
} from './services/noop-in-memory-data.service';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: ':filter',
    component: VisibleTodoListComponent,
  },
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full',
  },
];

export const REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<fromRoot.State>
>('Registered Reducers');

export const getReducers = () => fromRoot.reducers;

@NgModule({
  declarations: [
    AppComponent,
    FilterLinkComponent,
    FilterLinkNavComponent,
    TodoComponent,
    TodoFormComponent,
    TodoListComponent,
    VisibleTodoListComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      relativeLinkResolution: 'legacy',
    }),
    StoreModule.forRoot(REDUCER_TOKEN, {
      metaReducers: !environment.production ? [] : [],
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({
      serializer: DefaultRouterStateSerializer,
    }),
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      // If Cypress is running, use a noop InMemoryDataService
      // to allow Cypress to intercept HTTP requests.
      isCypress ? NoopInMemoryDataService : InMemoryDataService,
      {
        put204: false,
        passThruUnknownUrl: isCypress,
      }
    ),
  ],
  providers: [
    {
      provide: REDUCER_TOKEN,
      useFactory: getReducers,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
