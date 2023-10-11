import { Component, OnInit } from '@angular/core';
import { TotalesService } from './services/totales.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  disponible: number = 0;
  ingresos: number = 0;
  egresos: number = 0;
  porcentajeEgresos: number = 0;

  constructor(private totalesService: TotalesService) { }

  ngOnInit(): void {
    this.totalesService.ingresos.subscribe((valor) => {
      this.ingresos = valor;
    });

    this.totalesService.egresos.subscribe((valor) => {
      this.egresos = valor;
    });

    this.totalesService.balance.subscribe((valor) => {
      this.disponible = valor;
    });

    this.totalesService.porcentaje.subscribe((valor) => {
      this.porcentajeEgresos = valor;
    });
  }
}
