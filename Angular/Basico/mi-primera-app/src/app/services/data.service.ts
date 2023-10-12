import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../persona.model';

@Injectable()
export class DataService {
    private readonly fireBaseUrl:string = '{YourFirebaseURL_Here}';

    constructor(private httpClient: HttpClient) { }

    //Cargar Personas
    cargarPersonas() {
        let url:string = this.fireBaseUrl + 'datos.json';
        return this.httpClient.get(url);
    }

    //Guardar Personas
    guardarPersonas(personas: Persona[]) {
        let url:string = this.fireBaseUrl + 'datos.json';
        this.httpClient.put(url, personas)
            .subscribe(
                response => console.log('Resultado al guardar personas: ', response),
                error => console.log('Error al guardar personas: ', error)
            );
    }

    modificarPersona(index: number, persona: Persona) {
        let url: string;
        url = this.fireBaseUrl + `datos/${index}.json`;
        this.httpClient.put(url, persona)
            .subscribe(
                response => console.log('Resultado de modificar Persona: ', response),
                error => console.log('Error al actualizar Persona: ', error)
            );
    }

    eliminarPersona(index: number) {
        let url: string;
        url = this.fireBaseUrl + `datos/${index}.json`;
        this.httpClient.delete(url)
            .subscribe(
                response => console.log('Resultado de eliminar Persona: ', response),
                error => console.log('Error al eliminar Persona: ', error)
            );
    }
}