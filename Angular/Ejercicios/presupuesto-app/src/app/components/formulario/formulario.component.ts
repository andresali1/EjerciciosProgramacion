import { Component, OnInit } from '@angular/core';
import { Movimiento } from 'src/app/models/movimiento.moel';
import { RegistroService } from 'src/app/services/registro.service';
import { TotalesService } from 'src/app/services/totales.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  valor: number = 0;
  tipo: string = '+';
  descripcion: string = '';
  ingresos: number = 0;
  egresos: number = 0;
  balance: number = 0;
  porcentaje: number = 0;

  constructor(
    private totalesService: TotalesService,
    private registroService: RegistroService
  ) { }

  ngOnInit(): void {
    this.totalesService.ingresos.subscribe((valor) => {
      this.ingresos = valor;
    });

    this.totalesService.egresos.subscribe((valor) => {
      this.egresos = valor;
    });
  }

  enviarValor() {
    let porcentajeTemporal:number;
    let registro: Movimiento = new Movimiento(this.descripcion, this.valor);
    porcentajeTemporal = (this.valor * 100) / this.ingresos;
    registro.porcentaje = Math.round(porcentajeTemporal);    

    if (this.tipo == '+') {
      this.registroService.agregarIngreso(registro);
      this.ingresos = this.ingresos + this.valor;

      this.totalesService.ingresos.emit(this.ingresos);
    }

    if (this.tipo == '-') {
      this.registroService.agregarEgreso(registro);
      this.egresos = this.egresos + this.valor;

      this.totalesService.egresos.emit(this.egresos);
    }

    this.calculartotales();
    this.valor = 0;
    this.descripcion = '';
  }

  calculartotales(): void {
    this.balance = this.ingresos - this.egresos;
    this.porcentaje = (this.egresos * 100) / (this.ingresos != 0 ? this.ingresos : 1);

    this.totalesService.balance.emit(this.balance);
    this.totalesService.porcentaje.emit(Math.round(this.porcentaje));
  }
}
