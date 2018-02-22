import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../user/user';
import { UserStoreService } from '../../user/user-store.service';
import { AuthStoreService, LoginStatus } from '../auth-store.service';
import 'rxjs/add/observable/combineLatest';

@Component({
    selector: 'app-signedin',
    templateUrl: './signedin.component.html',
    styleUrls: ['./signedin.component.css']
})
export class SignedInComponent implements OnInit, OnDestroy {

    newLogin: Observable<LoginStatus>;
    sub;

    constructor(
        private http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private authStoreService: AuthStoreService
    ) { }

    ngOnInit() {
        this.newLogin = this.authStoreService.newLogin;
        this.sub = Observable.combineLatest(this.route.queryParams, this.newLogin).subscribe(data => {
            const params = data[0];
            let returnUrl = '';

            const status = data[1];
            if (status === LoginStatus.LoggedOut) {
                this.router.navigate(['/login']);
            } else if (status === LoginStatus.Registering) {
                this.router.navigate(['/register']);
            } else {
                if ('url' in params && params['url'] !== '') {
                    returnUrl = params['url'];
                } else {
                    const u = this.authStoreService.getUser();
                    returnUrl = '/u/' + u.username;
                }
                this.router.navigate([returnUrl]);
            }
        });

        this.authStoreService.loadUserByContext();
    }

    ngOnDestroy() {
        if (this.sub != null) {
            this.sub.unsubscribe();
        }
    }

}
