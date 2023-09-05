import { Component } from '@angular/core';

@Component({
  selector: 'app-for',
  templateUrl: './directiva-ng-for.component.html',
  styleUrls: ['./directiva-ng-for.component.css']
})
export class DirectivaNgForComponent {
  title: string = 'Directiva ngFor';
  subTitle: string = 'Blog de Lenguajes de programación';
  entradas;

  constructor(){
    this.entradas = [
      {titulo: "Python cada día más presente"},
      {titulo: "Java presente desde hace más de 20 años"},
      {titulo: "JavaScript cada vez más funcional"},
      {titulo: "Kotlin potencia para tus Apps"},
      {titulo: "Donde quedó Pascal"}
    ];
  }
}
