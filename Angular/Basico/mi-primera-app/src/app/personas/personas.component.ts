import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from '../persona.model';
import { PersonasService } from '../services/personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
})
export class PersonasComponent implements OnInit {
  boton_desabilitado: boolean = false;
  mensaje: string = '';
  nacionalidad: string = 'NN';
  titulo: string = 'Formulario Creación';
  mostrar: boolean = false;
  personas: Persona[] = [];

  constructor(
    private personasService: PersonasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.personasService.obtenerPersonas()
    .subscribe(
      data =>{
        let personas:Persona[] = data as Persona[];
        this.personas = personas;
        this.personasService.setPersonas(personas);
      }
    );
  }

  agregarPersona(): void {
    this.mensaje = 'Persona agregada';
    this.mostrar = true;
  }

  modificarTitulo(event: Event): void {
    this.titulo = (<HTMLInputElement>event.target).value;
  }

  agregar(): void {
    this.router.navigate(['personas/agregar']);
  }
}
