import { Injectable } from '@angular/core';
import { ExtractError } from '../errors';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { Upstream } from '../upstream/upstream';
import { UpstreamService } from '../upstream/upstream.service';
import { AdminService } from './admin.service';
import { ServerStats } from './admin';

@Injectable()
export class AdminStoreService {

    private _stats: BehaviorSubject<ServerStats>;
    private _upstreams: BehaviorSubject<Upstream[]>;
    private _users: BehaviorSubject<User[]>;
    private _usersTotal: BehaviorSubject<number>;
    private _errorMsg: BehaviorSubject<string>;

    constructor(
        private adminService: AdminService,
        private upstreamService: UpstreamService,
        private userService: UserService
    ) {
        this._stats = new BehaviorSubject(null);
        this._upstreams = new BehaviorSubject([]);
        this._users = new BehaviorSubject([]);
        this._usersTotal = new BehaviorSubject(0);
        this._errorMsg = new BehaviorSubject('');
    }

    get stats() { return this._stats.asObservable(); }
    get upstreams() { return this._upstreams.asObservable(); }
    get users() { return this._users.asObservable(); }
    get usersTotal() { return this._usersTotal.asObservable(); }

    loadServerStats() {
        this.adminService.getServerStats().subscribe(
            res => {
                this._stats.next(res);
            },
            err => {
                const msg = ExtractError(err);
                this._errorMsg.next(msg);
            }
        );
    }

    loadRepos() {
        this.adminService.loadRepos().subscribe(
            res => {
                console.log('load repos response: %o', res);
                // this._loadReposRes.next(res);
            },
            err => {
                console.log('load repos err: %o', err);
            }
        )
    }

    saveRepos() {
        this.adminService.saveRepos().subscribe(
            res => {
                console.log('save repos response: %o', res);
                // this._saveReposRes.next(res);
            },
            err => {
                console.log('save repos err: %o', err);
            }
        )
    }

    loadUpstreams(opt, pageSize, pageNum) {
        const opts = {};
        this.upstreamService.listUpstreams(opts).subscribe(
            res => {
                this._upstreams.next(res);
            },
            err => {
                const msg = ExtractError(err);
                this._errorMsg.next(msg);
            }
        );
    }

    loadUsers(opt, search, pageSize, pageNum) {
        let msg = {};
        switch (opt) {
            case 'public':
                msg = {
                    opts: {
                        page_size: pageSize,
                        page_num: pageNum
                    }
                };
                break;
            case 'upstream':
                msg = {
                    opts: {
                        upstream: 'usa',
                        page_size: pageSize,
                        page_num: pageNum
                    }
                };
                break;
            case 'all':
                if (search === '') {
                    msg = {
                        opts: {
                            all: true,
                            page_size: pageSize,
                            page_num: pageNum
                        }
                    };
                } else {
                    msg = {
                        opts: {
                            all: true,
                            search: search,
                            page_size: pageSize,
                            page_num: pageNum
                        }
                    };
                }
        }
        const sub = this.userService.listUsers(msg).subscribe(
            res => {
                if (res.users == null) {
                    this._users.next([]);
                    this._usersTotal.next(0);
                    return;
                }
                this._users.next(res.users);
                this._usersTotal.next(res.total);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
        );
    }

}
