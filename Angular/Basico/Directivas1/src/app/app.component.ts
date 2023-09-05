import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Directivas1';
  ngIfComponent_Visible: boolean = false;
  ngForComponent_Visible:boolean = false;
  practica1_Visible:boolean = false;
  styleClass_Visible:boolean = false;

  ngIf_toggle() {
    this.ngIfComponent_Visible = !this.ngIfComponent_Visible;
  }

  ngFor_toggle(){
    this.ngForComponent_Visible = !this.ngForComponent_Visible;
  }

  pratica1_toggle(){
    this.practica1_Visible = !this.practica1_Visible;
  }

  styleClass_toggle(){
    this.styleClass_Visible = !this.styleClass_Visible;
  }
}
