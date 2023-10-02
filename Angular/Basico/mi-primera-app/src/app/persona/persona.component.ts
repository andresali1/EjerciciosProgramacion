import { Component } from '@angular/core';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
})
export class PersonaComponent {
  nombre: string = 'Juan';
  apellido: string = 'Pérez';
  private edad: number = 28;

  getEdad(): number {
    return this.edad;
  }
}
