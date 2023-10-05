import { Component, EventEmitter, Output } from '@angular/core';
import { Persona } from 'src/app/persona.model';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  @Output() personaCreada = new EventEmitter<Persona>();

  nombrePersona: string = '';
  apellidoPersona: string = '';

  agregarPersonaV2(): void {
    let persona: Persona = new Persona(this.nombrePersona, this.apellidoPersona);
    this.personaCreada.emit(persona);
    this.nombrePersona = '';
    this.apellidoPersona = '';
  }
}
