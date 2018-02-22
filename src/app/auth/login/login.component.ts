import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { AuthStoreService, LoginStatus } from '../auth-store.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

    loginStatus: Observable<LoginStatus>;
    loginStatusSub;

    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private authStoreService: AuthStoreService
    ) { }

    ngOnInit() {
        const prev = this.route.snapshot.queryParams['url'];
        if (prev) {
            this.returnUrl = prev;
            this.authStoreService.setRedirectUrl(prev);
        }

        this.loginStatus = this.authStoreService.loginStatus;

        this.loginStatusSub = this.loginStatus.subscribe(status => {
            if (status === LoginStatus.Registering) {
                this.router.navigate(['/register']);
            } else if (status === LoginStatus.LoggedIn) {
                const s = this.authStoreService.getRedirectUrl();
                if (s) {
                    this.router.navigate([s]);
                } else {
                    const u = this.authStoreService.getUser();
                    if (u == null) {
                        return;
                    }
                    this.router.navigate(['/u/' + u.username]);
                }
            }
        });
    }

    ngOnDestroy() {
        this.loginStatusSub.unsubscribe();
    }

    getLoginUrl(provider: string): string {
        const url = this.authStoreService.getRedirectUrl();
        return this.authService.host() + '/login?provider=' + provider + '&url=' + url;
    }

}
