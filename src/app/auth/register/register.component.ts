import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AuthStoreService } from '../../auth/auth-store.service';
import { User } from '../../user/user';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

    user: Observable<User>;
    userValue: User;
    userSub;
    registerCtrl: FormGroup;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private authStoreService: AuthStoreService
    ) {
        this.userValue = new User();
        this.registerCtrl = fb.group({
            username: '',
            privacy: false
        });
    }

    ngOnInit() {
        this.user = this.authStoreService.user;

        this.userSub = this.user.subscribe(u => {
            if (u == null) {
                this.router.navigate(['/login']);
                return
            }
            this.userValue = u;
            if (u.username != undefined && u.username != "") {
                this.router.navigate(['/u/' + u.username]);
            }
        });
    }

    ngOnDestroy() {
        if (this.userSub != null) {
            this.userSub.unsubscribe();
        }
    }

    onSubmit() {
        this.authStoreService.registerUser("", this.registerCtrl.value.username);
    }

    checkUsername(e) {
        // console.log("check username:%o", e);
    }
}
