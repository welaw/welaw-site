import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BallotService } from '../ballot/ballot.service';
import { UserService } from './user.service';
import { AuthStoreService } from '../auth/auth-store.service';
import { User, UserProfile, Contribution } from './user';
import { LawService } from '../law/law.service';
import { LawSet } from '../law/law';
import { ExtractError } from '../errors';
import { Vote } from '../ballot/ballot';
import { sameMessage } from '../shared/format';

@Injectable()
export class UserStoreService {

    private _user: BehaviorSubject<User>;
    private _laws: BehaviorSubject<LawSet[]>;
    private _lawsTotal: BehaviorSubject<number>;
    private _votes: BehaviorSubject<Vote[]>;
    private _votesTotal: BehaviorSubject<number>;
    private _errorMsg: BehaviorSubject<string>;
    private _owner: BehaviorSubject<boolean>;
    private _admin: BehaviorSubject<boolean>;

    loadUserLawsLast: Object;
    loadUserByUsernameLast: Object;

    constructor(
        private router: Router,
        private authStoreService: AuthStoreService,
        private ballotService: BallotService,
        private userService: UserService,
        private lawService: LawService
    ) {
        this._user = new BehaviorSubject(null);
        this._laws = new BehaviorSubject([]);
        this._lawsTotal = new BehaviorSubject(null);
        this._votes = new BehaviorSubject([]);
        this._votesTotal = new BehaviorSubject(null);
        this._errorMsg = new BehaviorSubject('');
    }

    get user() { return this._user.asObservable(); }
    get laws() { return this._laws.asObservable(); }
    get lawsTotal() { return this._lawsTotal.asObservable(); }
    get votes() { return this._votes.asObservable(); }
    get votesTotal() { return this._votesTotal.asObservable(); }
    get errorMsg() { return this._errorMsg.asObservable(); }

    getUser() { return this._user.getValue(); }

    loadUserByUsername(username) {
        const msg = {
            opts: {
                req_type: 0,
                username: username
            }
        }
        if (sameMessage(msg, this.loadUserByUsernameLast)) {
            return;
        }
        this.loadUserByUsernameLast = msg;
        this.userService.getUser(msg).catch((err: Response | any) => {
            if (err instanceof Response) {
                if (err.status === 404) {
                    return Observable.of(null);
                }
                this._errorMsg.next('' + err)
                this.router.navigate(['/not-found']);
            }
            return Observable.throw(err);
        }).take(1).subscribe(
            r => {
                if (r == null) {
                    this._user.next(null);
                    this.router.navigate(['/not-found']);
                    return;
                }
                this._user.next(r);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
            );
    }

    loadUserVotes(username, orderBy, desc, search, pageNum, pageSize) {
        const msg = {
            opts: {
                username: username,
                order_by: orderBy,
                desc: desc,
                search: search,
                page_size: pageSize,
                page_num: pageNum
            }
        }
        this.ballotService.listVotes(msg).catch((err: Response | any) => {
            if (err instanceof Response) {
                if (err.status === 404) {
                    return Observable.of([]);
                }
            }
            return Observable.throw(err);
        }).take(1).subscribe(
            res => {
                if (res == null) {
                    return;
                }
                this._votes.next(res.votes);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            });
    }

    loadUserLaws(username, orderBy, desc, pageSize, pageNum) {
        const msg = {
            opts: {
                req_type: 0,
                username: username,
                order_by: orderBy,
                desc: desc,
                page_size: pageSize,
                page_num: pageNum
            }
        };
        if (sameMessage(msg, this.loadUserLawsLast)) {
            return;
        }
        this.loadUserLawsLast = msg;
        this.lawService.listLaws(msg).catch((err: Response | any) => {
            if (err instanceof Response) {
                if (err.status === 404) {
                    return Observable.of([]);
                }
            }
            return Observable.throw(err);
        }).take(1).subscribe(
            res => {
                this._laws.next(res.laws);
                this._lawsTotal.next(res.total);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
            );
    }

    updateUser(current: string, pictureUrl: string) {
        const msg = {
            username: current,
            opts: {
                picture_url: pictureUrl
            }
        }
        this.userService.updateUser(msg).catch((err: Response | any) => {
            if (err instanceof Response) {
                if (err.status === 404) {
                    return Observable.of([]);
                }
            }
            return Observable.throw(err);
        }).take(1).subscribe(
            res => {
                this._user.next(res);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
            );
    }

    updatePrivacySettings(username: string, emailPrivate: boolean, fullNamePrivate: boolean) {
        const msg = {
            username: username,
            opts: {
                email_private: emailPrivate,
                full_name_private: fullNamePrivate
            }
        };
        this.userService.updateUser(msg).catch((err: Response | any) => {
            if (err instanceof Response) {
                if (err.status === 404) {
                    return Observable.of([]);
                }
            }
            return Observable.throw(err);
        }).take(1).subscribe(
            res => {
                this._user.next(res);
                // TODO
                this.authStoreService.setUser(res);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
            );
    }

    updateUsername(current: string, username: string) {
        const msg = {
            username: current,
            opts: {
                username: username
            }
        };
        this.userService.updateUser(msg).catch((err: Response | any) => {
            if (err instanceof Response) {
                if (err.status === 404) {
                    return Observable.of([]);
                }
            }
            return Observable.throw(err);
        }).take(1).subscribe(
            res => {
                this._user.next(res);
                // TODO
                this.authStoreService.setUser(res);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
            );
    }

    deleteUser(username) {
        this.userService.deleteUser(username).catch((err: Response | any) => {
            return Observable.throw(err);
        }).take(1).subscribe(
            res => {
                this._user.next(null);
                // TODO
                this.authStoreService.clearUser();
                this.router.navigate(['/logout']);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
            );
    }

}
