import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-boton-accion',
  templateUrl: './boton-accion.component.html',
  styleUrls: ['./boton-accion.component.css'],
})
export class BotonAccionComponent {
  @Output() signoAEnviar = new EventEmitter<string>();
  @Input() signoRecibido!: string;
  @Input() esDoble!: boolean;

  botonPresionado(elemento: any): void {
    let signo = elemento != null ? elemento : '';
    this.signoAEnviar.emit(signo);
  }
}
