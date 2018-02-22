import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AuthStoreService } from './auth/auth-store.service';
import { LawStoreService } from './law/law-store.service';
import { UserStoreService } from './user/user-store.service';
import { UpstreamStoreService } from './upstream/upstream-store.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

    lawErrorSub;
    userErrorSub;
    upstreamErrorSub
    loggedInUserSub;

    constructor(
        public snackBar: MatSnackBar,
        private authStoreService: AuthStoreService,
        private lawStoreService: LawStoreService,
        private userStoreService: UserStoreService,
        private upstreamStoreService: UpstreamStoreService
    ) { }

    ngOnInit() {
        this.lawErrorSub = this.lawStoreService.errorMsg.subscribe(e => {
            if (e === '') {
                return;
            }
            this.snackBar.open(e, 'Error', {
                duration: 3000
            });
        });
        this.userErrorSub = this.userStoreService.errorMsg.subscribe(e => {
            if (e === '') {
                return;
            }
            this.snackBar.open(e, 'Error', {
                duration: 3000
            });
        });
        this.upstreamErrorSub = this.upstreamStoreService.errorMsg.subscribe(e => {
            if (e === '') {
                return;
            }
            this.snackBar.open(e, 'Error', {
                duration: 3000
            });
        });
        this.loggedInUserSub = this.authStoreService.user.subscribe(user => {
            if (user == null) {
                this.authStoreService.loggedInCheck();
            }
        });;
    }

    ngOnDestroy() {
        if (this.lawErrorSub != null) {
            this.lawErrorSub.unsubscribe();
        }
        if (this.userErrorSub != null) {
            this.userErrorSub.unsubscribe();
        }
        if (this.upstreamErrorSub != null) {
            this.upstreamErrorSub.unsubscribe();
        }
        if (this.loggedInUserSub != null) {
            this.loggedInUserSub.unsubscribe();
        }
    }
}
