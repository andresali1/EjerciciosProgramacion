import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonasComponent } from './personas/personas.component';
import { FormularioComponent } from './formulario/formulario/formulario.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { LoginGuardian } from './guards/login-guardian.service';

const routes: Routes = [
  { path: '', component: PersonasComponent, canActivate: [LoginGuardian] },
  {
    path: 'personas', component: PersonasComponent, canActivate: [LoginGuardian], children: [
      { path: 'agregar', component: FormularioComponent },
      { path: 'editar/:id', component: FormularioComponent }
    ]
  },
  { path: 'login', component: LoginComponent},
  { path: '**', component: ErrorComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
