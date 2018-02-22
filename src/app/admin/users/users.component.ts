import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { User } from '../../user/user';
import { AdminStoreService } from '../admin-store.service';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-users-admin',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersAdminComponent implements OnInit {

    pageIndex = 0;
    usersDataSource = new MatTableDataSource();
    displayedColumns = ['username', 'full_name', 'email', 'provider', 'last_login', 'created_at', 'deleted_at'];

    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 100];

    // MatPaginator Output
    pageEvent: PageEvent | void;

    users: Observable<User[]>;
    usersSub;
    usersTotal: Observable<number>;
    usersTotalSub;
    userOptions = ['Public', 'Upstream', 'All'];
    userOption = 'all';

    constructor(
        private adminStoreService: AdminStoreService
    ) { }

    ngOnInit() {
        this.users = this.adminStoreService.users;
        this.usersSub = this.users.subscribe(users => {
            if (users == null) {
                return;
            }
            this.usersDataSource.data = users;
        });

        this.usersTotal = this.adminStoreService.usersTotal;
        this.usersTotalSub = this.usersTotal.subscribe(r => {
            this.length = r;
        });

        this.adminStoreService.loadUsers(this.userOption, '', this.pageSize, this.pageIndex);
    }

    userOptionChanged(e) {
        this.adminStoreService.loadUsers(e.value, '', this.pageSize, this.pageIndex);
    }

    getServerData(e) {
        this.adminStoreService.loadUsers(this.userOption, '', e.pageSize, e.pageIndex);
    }

}
