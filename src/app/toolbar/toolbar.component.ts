import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthStoreService } from '../auth/auth-store.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../user/user';
import { avatarErrorURL } from '../shared/format';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {

    loggedIn: Observable<boolean>;
    user: User;
    userSub;
    avatarUrl: string;

    constructor(
        private authStoreService: AuthStoreService
    ) { }

    ngOnInit() {
        this.userSub = this.authStoreService.user.subscribe(u => {
            this.user = u;
        });
        this.loggedIn = this.authStoreService.loggedIn;
    }

    ngOnDestroy() {
        if (this.userSub != null) {
            this.userSub.unsubscribe();
        }
    }

    isAdmin() {
        return this.authStoreService.isAdmin();
    }

    hasRegistered() {
        if (this.user == null) {
            return false;
        }
        if (this.user.username == null || this.user.username === '') {
            return false;
        }
        return true;
    }

    avatarUrlError(e) {
        if (this.user == null) {
            return;
        }
        this.user.picture_url = avatarErrorURL(this.user.username);
    }

}
