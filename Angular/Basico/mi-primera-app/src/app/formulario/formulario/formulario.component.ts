import { Component, ElementRef, ViewChild } from '@angular/core';
import { Logging } from 'src/app/Logging.service';
import { Persona } from 'src/app/persona.model';
import { PersonasService } from 'src/app/personas.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [Logging],
})
export class FormularioComponent {
  //@Output() personaCreada = new EventEmitter<Persona>();

  nombrePersona: string = '';
  apellidoPersona: string = '';
  //@ViewChild('nombreRef') nombre: ElementRef;
  //@ViewChild('apellidoRef') apellido: ElementRef;

  constructor(
    private loggingService: Logging,
    private personasService: PersonasService
  ) {
    this.personasService.saludar.subscribe((indice: number) => {
      alert("El inidice es: " + indice);
    });
  }

  agregarPersona(){
    let persona: Persona = new Persona(this.nombrePersona, this.apellidoPersona);
    this.personasService.personaAgregada(persona);
  }

  //Con referencias
  /*
  agregarPersonaV2(nombre: string, apellido: string): void {
    let persona: Persona = new Persona(nombre, apellido);
    //this.personaCreada.emit(persona);
  }
  */

  //Con view Child
  /*
  agregarPersonaV3() {
    let persona: Persona = new Persona(
      this.nombre.nativeElement.value,
      this.apellido.nativeElement.value
    );

    //this.loggingService.enviarMensajeAConsola("Enviamos persona: " + persona.nombre + ", apellido: " + persona.apellido);
    //this.personaCreada.emit(persona);
    this.personasService.personaAgregada(persona);
  }
  */
}
