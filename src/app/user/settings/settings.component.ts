import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/Observable';
import { AuthStoreService } from '../../auth/auth-store.service';
import { UserStoreService } from '../user-store.service';
import { User, UserProfile } from '../user';
import { LawSet } from '../../law/law';
import { ChangeUsernameComponent } from './change-username/change-username.component';
import { DeleteUserComponent } from './delete/delete.component';
import { PrivacyDialogComponent } from './privacy/privacy.component';
import { ChangeFullNameComponent } from './change-full-name/change-full-name.component';

@Component({
    selector: 'app-user-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class UserSettingsComponent implements OnInit, OnDestroy {

    user: Observable<User>;
    userValue: User;
    loggedInUser: Observable<User>;

    changingUsername: boolean;
    newUsername: string;
    owner: boolean;
    admin: boolean;

    routeSub;
    ownerSub;
    userSub;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authStoreService: AuthStoreService,
        private userStoreService: UserStoreService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.user = this.userStoreService.user;
        this.loggedInUser = this.authStoreService.user;
        this.admin = this.authStoreService.isAdmin()

        this.ownerSub = Observable.combineLatest(this.user, this.loggedInUser).subscribe(data => {
            return this.setOwner(data[0], data[1]);
        });

        this.userSub = this.user.subscribe(user => {
            this.userValue = user;
        });
    }

    setOwner(user, loggedInUser) {
        if (this.admin) {
            this.owner = true;
            return;
        }
        if (user == null || loggedInUser == null) {
            this.owner = false;
            return;
        }
        if (user.username === loggedInUser.username) {
            this.owner = true;
            return;
        }
        this.owner = false;
        return;
    }

    ngOnDestroy() {
        if (this.userSub != null) {
            this.userSub.unsubscribe();
        }
        if (this.ownerSub != null) {
            this.ownerSub.unsubscribe();
        }
    }

    isUpstreamUser() {
        return this.user.map(r => {
            if (r == null) {
                return false;
            }
            if (r.upstream == null) {
                return false;
            }
            return r.username !== '';
        });
    }

    changeFullName() {
        const dialogRef = this.dialog.open(ChangeFullNameComponent, {
            width: '300px',
            data: { title: 'Change Full Name', current: this.newUsername, newUsername: this.newUsername }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.newUsername = result;
        });
    }

    updateBiography() {
    }

    changeUsername() {
        const dialogRef = this.dialog.open(ChangeUsernameComponent, {
            width: '300px',
            data: {
                title: 'Change Username',
                currentUsername: this.userValue.username
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.newUsername = result;
        });
    }

    privacySettings() {
        const dialogRef = this.dialog.open(PrivacyDialogComponent, {
            data: {
                emailPrivate: this.userValue.email_private,
                fullNamePrivate: this.userValue.full_name_private
            }
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    deleteAccount() {
        const dialogRef = this.dialog.open(DeleteUserComponent, {
            width: '300px',
            data: { title: 'Delete Account', username: this.userValue.username }
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    setPictureUrl() {
    }

}
