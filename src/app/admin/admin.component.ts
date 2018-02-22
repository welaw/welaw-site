import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../user/user';
import { AdminStoreService } from './admin-store.service';
import { AuthStoreService } from '../auth/auth-store.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    user: Observable<User>;

    constructor(
        private authStoreService: AuthStoreService,
        private adminStoreService: AdminStoreService
    ) { }

    ngOnInit() {
        this.user = this.authStoreService.user;
    }
}
