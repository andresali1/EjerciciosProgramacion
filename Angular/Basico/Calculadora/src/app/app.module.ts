import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { BotonNumeradoComponent } from './components/boton-numerado/boton-numerado.component';
import { BotonAccionComponent } from './components/boton-accion/boton-accion.component';
import { DisplayNumerosComponent } from './components/display-numeros/display-numeros.component';

@NgModule({
  declarations: [
    AppComponent,
    TableroComponent,
    BotonNumeradoComponent,
    BotonAccionComponent,
    DisplayNumerosComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
