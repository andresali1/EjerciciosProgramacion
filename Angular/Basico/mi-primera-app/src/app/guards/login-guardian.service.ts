import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { LoginService } from "../services/login.service";
import { Injectable } from "@angular/core";

@Injectable()
export class LoginGuardian implements CanActivate{
    constructor(
        private loginService: LoginService,
        private router: Router
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.loginService.isAutenticado()){
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}