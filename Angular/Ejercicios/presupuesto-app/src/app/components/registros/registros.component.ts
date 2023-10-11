import { Component, Input, OnInit } from '@angular/core';
import { Movimiento } from 'src/app/models/movimiento.moel';
import { RegistroService } from 'src/app/services/registro.service';
import { TotalesService } from 'src/app/services/totales.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() esIngreso: boolean = true;
  datos: Movimiento[] = [];

  ingresos: number = 0;
  egresos: number = 0;
  balance: number = 0;
  porcentaje: number = 0;

  constructor(
    private registroService: RegistroService,
    private totalesService: TotalesService
  ) { }

  ngOnInit(): void {
    this.totalesService.ingresos.subscribe((valor) => {
      this.ingresos = valor;
    });

    this.totalesService.egresos.subscribe((valor) => {
      this.egresos = valor;
    });

    if (this.esIngreso) {
      this.datos = this.registroService.ingresos;
    } else {
      this.datos = this.registroService.egresos;
    }
  }

  eliminarRegistro(indice: number) {
    let datoEliminado: Movimiento = this.datos[indice];
    this.datos.splice(indice, 1);

    if (this.esIngreso) {
      let nuevoIngreso: number;
      nuevoIngreso = this.ingresos - datoEliminado.valor;
      this.ingresos = nuevoIngreso;
      this.totalesService.ingresos.emit(nuevoIngreso);
    } else {
      let nuevoEgreso: number;
      nuevoEgreso = this.egresos - datoEliminado.valor;
      this.egresos = nuevoEgreso;
      this.totalesService.egresos.emit(nuevoEgreso);
    }

    this.calcularTotales();
  }

  calcularTotales(): void {
    this.balance = this.ingresos - this.egresos;
    this.porcentaje = (this.egresos * 100) / (this.ingresos != 0 ? this.ingresos : 1);

    this.totalesService.balance.emit(this.balance);
    this.totalesService.porcentaje.emit(Math.round(this.porcentaje));
  }

  obtenerPorcentaje(indice: number): number {
    let obtenido:Movimiento = this.datos[indice];
    obtenido.porcentaje = Math.round((obtenido.valor * 100) / (this.ingresos > 0 ? this.ingresos : 1));
    return obtenido.porcentaje
  }
}
