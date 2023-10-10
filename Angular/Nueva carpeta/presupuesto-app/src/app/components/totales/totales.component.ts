import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-totales',
  templateUrl: './totales.component.html',
  styleUrls: ['./totales.component.css']
})
export class TotalesComponent {
  @Input() disponible:number = 0;
  @Input() ingresos:number = 0;
  @Input() egresos:number = 0;
}
