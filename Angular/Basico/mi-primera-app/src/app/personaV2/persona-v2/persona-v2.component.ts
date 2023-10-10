import { Component, Input } from '@angular/core';
import { Persona } from 'src/app/persona.model';
import { PersonasService } from 'src/app/personas.service';

@Component({
  selector: 'app-persona-v2',
  templateUrl: './persona-v2.component.html',
  styleUrls: ['./persona-v2.component.css'],
})
export class PersonaV2Component {
  @Input() persona: Persona;
  @Input() indice: number;

  constructor(private personasService: PersonasService) {}

  emitirSaludo(): void {
    this.personasService.saludar.emit(this.indice);
  }
}
