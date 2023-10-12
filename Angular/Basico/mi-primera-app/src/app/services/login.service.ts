import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable()
export class LoginService {
    token: string | null;
    constructor(private router: Router) { }

    //Login Method
    Login(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    firebase.auth().currentUser?.getIdToken().then(
                        token => {
                            this.token = token;
                            this.router.navigate(['/']);
                        }
                    )
                },
                error => console.log('Error generado en Login: ', error)
            );
    }

    getIdToken() {
        return this.token;
    }

    isAutenticado(): boolean {
        return this.token != null;
    }

    logout(){
        firebase.auth().signOut().then(() =>{
            this.token = null;
            this.router.navigate(['login']);
        }).catch(error => {
            console.log("Error de Loguot", error);
        })
    }
}