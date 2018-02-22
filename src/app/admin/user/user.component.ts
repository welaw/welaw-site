import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../user/user';
import { UserStoreService } from '../../user/user-store.service';
import { PasswordComponent } from './password/password.component';

@Component({
    selector: 'app-admin-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class AdminUserComponent implements OnInit {

    user;
    userSub;
    routeSub;
    userCtrl: FormGroup;
    userValue: User;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private userStoreService: UserStoreService
    ) {
        this.userCtrl = fb.group({
            username: '',
            password: '',
            provider: '',
            provider_id: '',
            full_name: '',
            full_name_private: true,
            upstream: '',
            biography: '',
            email: '',
            email_private: true,
            picture_url: '',
            created_at: [{ value: '', disabled: true }],
            updated_at: [{ value: '', disabled: true }],
            deleted_at: [{ value: '', disabled: true }],
            roles: []
        });
    }

    ngOnInit() {
        this.user = this.userStoreService.user;

        //this.routeSub = this.route.parent.params.subscribe((params: Params) => {
        //this.userStoreService.loadUserByUsername(params['user']);
        //});

        this.userSub = this.user.subscribe(user => {
            this.userValue = user;
            if (user == null) {
                return;
            }
            this.userCtrl.patchValue({
                username: user.username,
                provider: user.provider,
                provider_id: user.providerId,
                full_name: user.fullName,
                full_name_private: user.fullNamePrivate,
                upstream: user.upstream,
                biography: user.biography,
                email: user.email,
                email_private: user.emailPrivate,
                picture_url: user.pictureUrl,
                created_at: user.createdAt,
                updated_at: user.updatedAt,
                deleted_at: user.deletedAt,
                roles: user.roles
            });
        });
    }

    setPassword() {
        const dialogRef = this.dialog.open(PasswordComponent, {
            width: '300px',
            data: {
                username: this.userValue.username
            }
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    submit() {
        this.userStoreService.updateUser(this.userValue.username, this.userCtrl.value.picture_url);
    }
}
