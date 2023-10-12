import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { environment } from './environments/environment';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  titlulo = 'Mi Primera App en Angular';

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: environment.firebase.apiKey,
      authDomain: environment.firebase.authDomain
    });
  }

  isAutenticado(): boolean {
    return this.loginService.isAutenticado();
  }

  salir(): void {
    this.loginService.logout();
  }
}
