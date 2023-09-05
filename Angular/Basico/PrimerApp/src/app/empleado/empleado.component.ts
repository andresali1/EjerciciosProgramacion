import { Component } from '@angular/core';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  //template: "<p>Aqui iría un empleado</p>", (Html en línea)
  styleUrls: ['./empleado.component.css']
  //styles: ["p{background-color: aquamarine;}"] (Estilos en línea)
})
export class EmpleadoComponent {
  //nombre = 'Lorena';
  apellido = 'Gómez';
  edad = 18;
  //empresa = 'Tech S.A.S.';
  ciudad = 'La city';

  //Propiedades para binding
  inhabilitacionEmpresa = false;
  estaRegistrado = false;
  textoDeRegistro = "No hay nadie registrado";

  registroUsuario(value:boolean){
    this.estaRegistrado = value;
    if (this.estaRegistrado){
      this.crearRegistro();
    } else {
      this.removerRegistro();
    }
  }

  guardaEmpresa(value:string){
    var tieneTexto = value != ''
    this.registroUsuario(tieneTexto);
  }

  validarRegistrado(event:Event){
    if((<HTMLInputElement>event.target).value == "Si"){
      this.crearRegistro();
    } else {
      this.removerRegistro();
    }
  }

  crearRegistro(){
    this.estaRegistrado = true;
    this.textoDeRegistro = "Se ha registrado un usuario";
  }

  removerRegistro(){
    this.estaRegistrado = false;
    this.textoDeRegistro = "No hay nadie registrado";
  }
}
