import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-boton-numerado',
  templateUrl: './boton-numerado.component.html',
  styleUrls: ['./boton-numerado.component.css'],
})
export class BotonNumeradoComponent {
  @Output() numeroAEnviar = new EventEmitter<string>();
  @Input() numeroRecibido!: string;
  @Input() esDoble!: boolean;

  botonPresionado(elemento: any): void {
    let numero = elemento != null ? elemento : '';
    this.numeroAEnviar.emit(numero);
  }
}
