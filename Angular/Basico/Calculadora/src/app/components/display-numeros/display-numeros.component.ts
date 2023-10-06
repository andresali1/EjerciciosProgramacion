import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-numeros',
  templateUrl: './display-numeros.component.html',
  styleUrls: ['./display-numeros.component.css'],
})
export class DisplayNumerosComponent {
  @Input() displayNumero: number = 0;
  @Input() displayCalculo: string = '0';

  validarCifra(event: Event): void {
    let inputValue = (<HTMLInputElement>event.target).value;
    console.log(inputValue);
  }
}
