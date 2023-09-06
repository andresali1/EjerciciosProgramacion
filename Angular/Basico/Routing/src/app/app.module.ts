import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpleadoFormComponent } from './components/home/empleado-form/empleado-form.component';
import { EmpleadoDetalleComponent } from './components/home/empleado-detalle/empleado-detalle.component';
import { EmpleadoComponent } from './components/home/empleado/empleado.component';
import { DatosService } from './services/datos.service';
import { AlertService } from './services/alert.service';
import { HomeComponentComponent } from './components/home/home-component/home-component.component';
import { ContactComponentComponent } from './components/contacts/contact-component/contact-component.component';
import { RouterModule, Routes } from '@angular/router';
import { CreacionComponentComponent } from './components/creacion/creacion-component/creacion-component.component';
import { EdicionComponentComponent } from './components/edicion/edicion-component/edicion-component.component';
import { ErrorPersonalizadoComponent } from './components/error/error-personalizado/error-personalizado.component';

const appRoutes:Routes = [
  {path: '', component: HomeComponentComponent},
  {path: 'creacion', component: CreacionComponentComponent},
  {path: 'contacto', component: ContactComponentComponent},
  {path: 'edicion/:id', component: EdicionComponentComponent},
  {path: '**', component: ErrorPersonalizadoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    EmpleadoFormComponent,
    EmpleadoComponent,
    EmpleadoDetalleComponent,
    HomeComponentComponent,
    ContactComponentComponent,
    CreacionComponentComponent,
    EdicionComponentComponent,
    ErrorPersonalizadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    DatosService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
