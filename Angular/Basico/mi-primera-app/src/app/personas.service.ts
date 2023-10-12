import { EventEmitter, Injectable } from '@angular/core';
import { Logging } from './Logging.service';
import { Persona } from './persona.model';

@Injectable()
export class PersonasService {
  personas: Persona[] = [];
  saludar = new EventEmitter<number>();

  constructor(private loggingService: Logging) { }

  personaAgregada(persona: Persona): void {
    this.loggingService.enviarMensajeAConsola("Agregamos persona con nombre: " + persona.nombre + " y apellido: " + persona.apellido + ". Desde el servicio");
    this.personas.push(persona);
  }

  encontrarPersona(index: number) {
    let persona: Persona = this.personas[index];
    return persona;
  }

  modificarPersona(index: number, persona: Persona) {
    let persona1: Persona = this.personas[index];
    persona1.nombre = persona.nombre;
    persona1.apellido = persona.apellido;
  }

  eliminarPersona(index: number) { 
    this.personas.splice(index, 1);
  }
}
