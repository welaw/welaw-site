import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../auth/auth.service';
import { UserService } from '../../../user/user.service';

@Component({
    selector: 'app-admin-set-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

    username: string;
    newPassword: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private userService: UserService,
        public dialogRef: MatDialogRef<PasswordComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.username = data.username;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
    }

    submit() {
        const msg = {
            username: this.username,
            opts: {
                password: this.newPassword
            }
        };
        this.userService.updateUser(msg).catch((err: Response | any) => {
            if (err instanceof Response) {
                if (err.status === 404) {
                    return Observable.of(null);
                }
            }
            return Observable.throw(err);
        }).subscribe(
            res => {
                if (res == null) {
                    return;
                }
            },
            err => {
                console.log('error: %o', err);
            }
            );
        this.dialogRef.close();
    }

}
