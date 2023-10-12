import { EventEmitter, Injectable } from '@angular/core';
import { Logging } from './Logging.service';
import { Persona } from '../persona.model';
import { DataService } from './data.service';
import { Observable } from 'rxjs';

@Injectable()
export class PersonasService {
  personas: Persona[] = [];
  saludar = new EventEmitter<number>();

  constructor(
    private loggingService: Logging,
    private dataService: DataService
  ) { }

  setPersonas(personas: Persona[]){
    this.personas = personas;
  }

  obtenerPersonas() {
    return this.dataService.cargarPersonas();
  }

  personaAgregada(persona: Persona): void {
    this.loggingService.enviarMensajeAConsola("Agregamos persona con nombre: " + persona.nombre + " y apellido: " + persona.apellido + ". Desde el servicio");

    if(this.personas == null){
      this.personas = [];
    }

    this.personas.push(persona);
    this.dataService.guardarPersonas(this.personas);
  }

  encontrarPersona(index: number) {
    let persona: Persona = this.personas[index];
    return persona;
  }

  modificarPersona(index: number, persona: Persona) {
    let persona1: Persona = this.personas[index];
    persona1.nombre = persona.nombre;
    persona1.apellido = persona.apellido;
    this.dataService.modificarPersona(index, persona);
  }

  eliminarPersona(index: number) {
    this.personas.splice(index, 1);
    this.dataService.eliminarPersona(index);
    //se vuelve a guardar el arreglo para regenerar los indices
    this.modificarPersonas();
  }

  modificarPersonas(){
    if(this.personas != null){
      this.dataService.guardarPersonas(this.personas);
    }
  }
}
