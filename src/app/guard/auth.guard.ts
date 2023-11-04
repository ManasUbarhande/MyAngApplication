import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service'; // Assuming you have an AuthService for handling authentication
import { ToastrService } from 'ngx-toastr'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private service: AuthService, private router: Router, private toastr: ToastrService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.service.IsLoggedIn()) {
      // If the user is authenticated, allow access to the route.
      if(route.url.length>0){
        let menu=route.url[0].path;
        if(menu=='user'){
          if(this.service.GetUserRole()=='admin'){
            return true;
          }else{
            this.toastr.warning('you dont have access');
            this.router.navigate(['']);
          }

        }

      }else{
        return true;
      }
      return true;
    } else {
      // If the user is not authenticated, redirect to the login page or any other route.
      this.router.navigate(['login']); // Redirect to the login page
      return false;
    }
  }
}
