import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DirectivaNgIfComponent } from './directiva-ng-if/directiva-ng-if.component';
import { FormsModule } from '@angular/forms';
import { DirectivaNgForComponent } from './directiva-ng-for/directiva-ng-for.component';
import { Practica1Component } from './practica1/practica1.component';
import { DirectivasStyleClassComponent } from './directivas-style-class/directivas-style-class.component';

@NgModule({
  declarations: [
    AppComponent,
    DirectivaNgIfComponent,
    DirectivaNgForComponent,
    Practica1Component,
    DirectivasStyleClassComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
