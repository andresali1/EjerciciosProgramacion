import { Component } from '@angular/core';
import { Persona } from '../persona.model';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
})
export class PersonasComponent {
  boton_desabilitado: boolean = false;
  mensaje: string = '';
  nacionalidad: string = 'NN';
  titulo: string = '';
  mostrar: boolean = false;

  personas: Persona[] = [];

  agregarPersona(): void {
    this.mensaje = 'Persona agregada';
    this.mostrar = true;
  }

  modificarTitulo(event: Event): void {
    this.titulo = (<HTMLInputElement>event.target).value;
  }

  personaAgregada(persona: Persona): void {
    this.personas.push(persona);
  }
}
