import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { EmpleadoComponent } from './empleado/empleado.component';
import { EmpleadoDetalleComponent } from './empleado-detalle/empleado-detalle.component';
import { ServicioEmpleadosService } from './services/servicio-empleados.service';
import { DatosEmpleadosService } from './services/datos-empleados.service';

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
  providers: [
    ServicioEmpleadosService,
    DatosEmpleadosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
