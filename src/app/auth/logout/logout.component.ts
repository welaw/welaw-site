import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStoreService } from '../auth-store.service';
import { User } from '../../user/user';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authStoreService: AuthStoreService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authStoreService.logout().subscribe(_ => {
      this.router.navigate(['/']);
    });
  }

}
