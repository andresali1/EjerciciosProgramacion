import { Injectable } from "@angular/core";
import { Empleado } from "../models/empleado.model";
import { ServicioEmpleadosService } from "./servicio-empleados.service";

@Injectable()
export class DatosEmpleadosService{
    constructor(private alertService:ServicioEmpleadosService) {}

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
}