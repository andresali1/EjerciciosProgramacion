import { Component, Input } from '@angular/core';
import { Persona } from 'src/app/persona.model';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-persona-v2',
  templateUrl: './persona-v2.component.html',
  styleUrls: ['./persona-v2.component.css'],
})
export class PersonaV2Component {
  @Input() persona: Persona;
  @Input() indice: number;

  constructor(private personaService: PersonasService) {}

  emitirSaludo(): void {
    this.personaService.saludar.emit(this.indice);
  }
}
