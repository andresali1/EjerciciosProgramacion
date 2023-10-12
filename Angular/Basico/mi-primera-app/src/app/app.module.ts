import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PersonasComponent } from './personas/personas.component';
import { PersonaComponent } from './persona/persona.component';
import { FormsModule } from '@angular/forms';
import { PersonaV2Component } from './personaV2/persona-v2/persona-v2.component';
import { FormularioComponent } from './formulario/formulario/formulario.component';
import { Logging } from './services/Logging.service';
import { PersonasService } from './services/personas.service';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error.component';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PersonasComponent,
    PersonaComponent,
    PersonaV2Component,
    FormularioComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    Logging,
    PersonasService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
