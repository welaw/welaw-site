import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { User } from '../user/user';
import { AuthStoreService } from './auth-store.service';

@Injectable()
export class AuthGuard implements CanActivate {

    user: Observable<User>;

    constructor(
        private router: Router,
        private authStoreService: AuthStoreService
    ) {
        this.user = this.authStoreService.user;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.user.map(u => {
            if (u == null || u.username == null) {
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                return false;
            } else {
                return true;
            }
        });
    }

}
