import { EventEmitter } from "@angular/core";

export class TotalesService {
    ingresos = new EventEmitter<number>();
    egresos = new EventEmitter<number>();
    balance = new EventEmitter<number>();
    porcentaje = new EventEmitter<number>();
}