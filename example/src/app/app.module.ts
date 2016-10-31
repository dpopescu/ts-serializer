import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {AppComponent} from './app.component';
import {ExternalPageComponent} from './external-page/external-page.component';
import {RouterModule} from '@angular/router';
import { SafePipePipe } from './safe-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ExternalPageComponent,
    SafePipePipe
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/docs',
        pathMatch: 'full'
      },
      {
        path: 'docs',
        component: ExternalPageComponent
      },
      {
        path: 'unit_tests',
        component: ExternalPageComponent
      },
      {
        path: 'coverage',
        component: ExternalPageComponent
      }
    ])
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
