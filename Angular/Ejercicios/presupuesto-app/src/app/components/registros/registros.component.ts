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

  constructor(
    private registroService: RegistroService
  ) { }

  ngOnInit(): void {
    if (this.esIngreso) {
      this.datos = this.registroService.ingresos;
    } else {
      this.datos = this.registroService.egresos;
    }
  }
}
