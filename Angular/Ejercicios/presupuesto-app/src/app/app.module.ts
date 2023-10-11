import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TotalesComponent } from './components/totales/totales.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { RegistrosComponent } from './components/registros/registros.component';
import { FormsModule } from '@angular/forms';
import { TotalesService } from './services/totales.service';
import { RegistroService } from './services/registro.service';

@NgModule({
  declarations: [
    AppComponent,
    TotalesComponent,
    FormularioComponent,
    RegistrosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    TotalesService,
    RegistroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
