import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from "../services/user.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private userService:UserService,private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        const currentUser = this.userService.currentUserValue;
        if (currentUser) {
            // check if route is restricted by role
            if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
                console.log(currentUser.role + "fail in " + route.data.roles);
                // role not authorised so redirect to home page
                this.router.navigate(['/']);
                return false;
            }
            // authorised so return true
            return true;
        }
        console.log("Need log in");
        // not logged in so redirect to login page with the return url{queryParams: {returnUrl: state.url}}
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
    }

}