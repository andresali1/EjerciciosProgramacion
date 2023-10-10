import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PersonasComponent } from './personas/personas.component';
import { PersonaComponent } from './persona/persona.component';
import { FormsModule } from '@angular/forms';
import { PersonaV2Component } from './personaV2/persona-v2/persona-v2.component';
import { FormularioComponent } from './formulario/formulario/formulario.component';
import { Logging } from './Logging.service';
import { PersonasService } from './personas.service';

@NgModule({
  declarations: [
    AppComponent,
    PersonasComponent,
    PersonaComponent,
    PersonaV2Component,
    FormularioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    Logging,
    PersonasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
