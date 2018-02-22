import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthStoreService } from '../auth/auth-store.service';
import { UserStoreService } from './user-store.service';
import { User } from './user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: Observable<User>;
  loggedInUser: Observable<User>;

  admin: boolean;
  owner: boolean;
  ownerSub;

  constructor(
    private route: ActivatedRoute,
    private authStoreService: AuthStoreService,
    private userStoreService: UserStoreService
  ) { }

  ngOnInit() {
    this.user = this.userStoreService.user;
    this.loggedInUser = this.authStoreService.user;
    this.admin = this.authStoreService.isAdmin()

    this.route.params.subscribe((params: Params) => {
      this.userStoreService.loadUserByUsername(params['user']);
    });

    this.ownerSub = Observable.combineLatest(this.user, this.loggedInUser).subscribe(data => {
      let user = data[0];
      let loggedInUser = data[1];
      if (user == undefined || loggedInUser == undefined) {
        this.owner = false;
      } else if (user.username == loggedInUser.username) {
        this.owner = true;
      } else {
        this.owner = false;
      }
    });
  }

}
