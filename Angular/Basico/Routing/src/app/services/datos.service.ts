import { Injectable } from "@angular/core";
import { Empleado } from "../models/empleado.model";
import { AlertService } from "./alert.service";

@Injectable()
export class DatosService{
    constructor(private alertService:AlertService) {}

    empleados: Empleado[] = [
        new Empleado('Camilo', 'Pérez', 'Analista', 1300),
        new Empleado('Camila', 'Torres', 'Asesor', 1000),
        new Empleado('Lorena', 'Ávila', 'Gerente', 5500),
        new Empleado('Fabiola', 'Domínguez', 'Profesional', 3000)
    ];

    agregarEmpleado(empleado:Empleado){
        this.mostrarInfo(`Los datos del empleado son -> Nombre: ${empleado.nombre}; Apellido ${empleado.apellido}; Cargo: ${empleado.cargo}; Salario ${empleado.salario}`);
        this.empleados.push(empleado);
    }

    mostrarInfo(mensaje:string){
        this.alertService.muestraMensaje(mensaje);
    }

    encontrarEmpleado(id:number){
        if(id < 0 || id > this.empleados.length - 1){
            this.mostrarInfo("Empleado no encontrado");
            throw new Error("Empleado no encontrado");
        }

        let empleado:Empleado = this.empleados[id];

        return empleado;
    }

    editarEmpleado(id:number, empleado:Empleado){
        if(id < 0 || id > this.empleados.length - 1){
            this.mostrarInfo("Empleado no encontrado");
            return;
        }

        this.empleados[id].nombre = empleado.nombre;
        this.empleados[id].apellido = empleado.apellido;
        this.empleados[id].cargo = empleado.cargo;
        this.empleados[id].salario = empleado.salario;
    }

    eliminarEmpleado(id:number){
        if(id < 0 || id > this.empleados.length - 1){
            this.mostrarInfo("Empleado no encontrado");
            return;
        }

        this.empleados.splice(id, 1);
        this.mostrarInfo("El empleado ha sido eliminado");
    }
}