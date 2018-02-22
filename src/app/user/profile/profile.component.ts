import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserStoreService } from '../user-store.service';
import { User } from '../user';

@Component({
    selector: 'app-user-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class UserProfileComponent implements OnInit {

    user: Observable<User>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userStoreService: UserStoreService
    ) { }

    ngOnInit() {
        this.user = this.userStoreService.user;
    }

}
