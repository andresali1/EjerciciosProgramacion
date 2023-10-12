import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../persona.model';
import { LoginService } from './login.service';
import { environment } from '../environments/environment';

@Injectable()
export class DataService {
    private readonly fireBaseUrl:string = environment.firebase.databaseURL;

    constructor(
        private httpClient: HttpClient,
        private loginService: LoginService
    ) { }

    //Cargar Personas
    cargarPersonas() {
        const token = this.loginService.getIdToken();
        let url:string = this.fireBaseUrl + '/datos.json?auth=' + token;
        return this.httpClient.get(url);
    }

    //Guardar Personas
    guardarPersonas(personas: Persona[]) {
        const token = this.loginService.getIdToken();
        let url:string = this.fireBaseUrl + '/datos.json?auth=' + token;
        this.httpClient.put(url, personas)
            .subscribe(
                response => console.log('Resultado al guardar personas: ', response),
                error => console.log('Error al guardar personas: ', error)
            );
    }

    modificarPersona(index: number, persona: Persona) {
        const token = this.loginService.getIdToken();
        let url: string;
        url = this.fireBaseUrl + `/datos/${index}.json?auth=` + token;
        this.httpClient.put(url, persona)
            .subscribe(
                response => console.log('Resultado de modificar Persona: ', response),
                error => console.log('Error al actualizar Persona: ', error)
            );
    }

    eliminarPersona(index: number) {
        const token = this.loginService.getIdToken();
        let url: string;
        url = this.fireBaseUrl + `/datos/${index}.json?auth=` + token;
        this.httpClient.delete(url)
            .subscribe(
                response => console.log('Resultado de eliminar Persona: ', response),
                error => console.log('Error al eliminar Persona: ', error)
            );
    }
}