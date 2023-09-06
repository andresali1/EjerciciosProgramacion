import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-personalizado',
  templateUrl: './error-personalizado.component.html',
  styleUrls: ['./error-personalizado.component.css']
})
export class ErrorPersonalizadoComponent {
  constructor(private router:Router) {}

  volverHome() {
    this.router.navigate(['']);
  }
}
