import { Movimiento } from "../models/movimiento.moel";

export class RegistroService{
    ingresos: Movimiento[] = [];
    egresos: Movimiento[] = [];

    agregarIngreso(ingreso:Movimiento){
        this.ingresos.push(ingreso);
    }

    agregarEgreso(egreso:Movimiento){
        this.egresos.push(egreso);
    }
}