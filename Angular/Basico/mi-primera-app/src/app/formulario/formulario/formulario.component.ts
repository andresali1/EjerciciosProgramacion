import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Logging } from 'src/app/services/Logging.service';
import { Persona } from 'src/app/persona.model';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [Logging],
})
export class FormularioComponent implements OnInit {
  //@Output() personaCreada = new EventEmitter<Persona>();
  titulo: string = 'Formulario Creación';
  nombrePersona: string = '';
  apellidoPersona: string = '';
  index: number;
  modoEdicion:number;

  //@ViewChild('nombreRef') nombre: ElementRef;
  //@ViewChild('apellidoRef') apellido: ElementRef;

  constructor(
    private personasService: PersonasService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.personasService.saludar.subscribe((indice: number) => {
      alert("El inidice es: " + indice);
    });
  }

  ngOnInit(): void {
    this.index = this.route.snapshot.params['id'];
    this.modoEdicion = +this.route.snapshot.queryParams['modoEdicion'];

    if (this.modoEdicion != null && this.modoEdicion === 1) {
      let persona: Persona = this.personasService.encontrarPersona(this.index);
      this.nombrePersona = persona.nombre;
      this.apellidoPersona = persona.apellido;
    }
  }

  onGuardarPersona() {
    let persona: Persona = new Persona(this.nombrePersona, this.apellidoPersona);

    if (this.modoEdicion != null && this.modoEdicion === 1) {
      this.personasService.modificarPersona(this.index, persona);
    } else {
      this.personasService.personaAgregada(persona);
    }

    this.router.navigate(['personas']);
  }

  eliminarPersona() {
    if (this.index != null) {
      this.personasService.eliminarPersona(this.index);
    }

    this.router.navigate(['personas']);
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
