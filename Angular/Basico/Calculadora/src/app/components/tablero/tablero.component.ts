import { Component } from '@angular/core';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css'],
})
export class TableroComponent {
  numeros: string[] = [];
  displayNumero: number = 0;
  displayCalculo: string = '0';

  numerosLinea1: string[] = ['0', '.'];
  numerosLinea2: string[] = ['1', '2', '3'];
  numerosLinea3: string[] = ['4', '5', '6'];
  numerosLinea4: string[] = ['7', '8', '9'];
  signosLinea4: string[] = ['C', 'CE'];
  signosLinea3: string[] = ['*', '/'];
  signosLinea2: string[] = ['+', '-'];
  signosLinea1: string[] = ['='];

  signo: string = '';
  num1: number = 0;
  num2: number = 0;
  total: number = 0;

  obtenerCifra(numero: string): void {
    if (numero == '.' && !this.numeros.includes('.')) {
      this.numeros.push(numero);
    } else if (numero != '.') {
      this.numeros.push(numero);
    }

    this.displayNumero = parseFloat(this.numeros.join(''));
  }

  obtenerSigno(signo: string): void {
    if (signo == 'C' || signo == 'CE') {
      this.limpiar(signo);
    } else if (signo == '=') {
      this.operar();
    } else {
      this.asignarSigno(signo);
    }
  }

  asignarSigno(signo: string): void {}

  operar(): void {}

  limpiar(signo: string): void {}
}
