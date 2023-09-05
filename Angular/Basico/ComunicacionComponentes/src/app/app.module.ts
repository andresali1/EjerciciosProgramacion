import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { EmpleadoComponent } from './empleado/empleado.component';
import { EmpleadoDetalleComponent } from './empleado-detalle/empleado-detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpleadoComponent,
    EmpleadoDetalleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
