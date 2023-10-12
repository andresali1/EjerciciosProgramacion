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
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { LoginGuardian } from './guards/login-guardian.service';

@NgModule({
  declarations: [
    AppComponent,
    PersonasComponent,
    PersonaComponent,
    PersonaV2Component,
    FormularioComponent,
    ErrorComponent,
    LoginComponent
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
    DataService,
    LoginService,
    LoginGuardian
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
