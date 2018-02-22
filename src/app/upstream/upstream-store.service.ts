import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { Upstream } from './upstream';
import { User } from '../user/user';
import { Law, Branch, Version, Author, LawSet, LawTag } from '../law/law';
import { ExtractError } from '../errors';
import { UpstreamService } from './upstream.service';
import { LawService } from '../law/law.service';
import { BallotService } from '../ballot/ballot.service';
import { Vote } from '../ballot/ballot';
import { UserService } from '../user/user.service';

@Injectable()
export class UpstreamStoreService {

    private _upstream: BehaviorSubject<Upstream>;
    private _tags: BehaviorSubject<LawTag[]>;
    private _errorMsg: BehaviorSubject<string>;
    private _laws: BehaviorSubject<LawSet[]>;
    private _lawsCount: BehaviorSubject<number>;
    private _votes: BehaviorSubject<Vote[]>;
    private _votesCount: BehaviorSubject<number>;
    private _users: BehaviorSubject<User[]>;
    private _usersTotal: BehaviorSubject<number>;

    constructor(
        private router: Router,
        private ballotService: BallotService,
        private lawService: LawService,
        private upstreamService: UpstreamService,
        private userService: UserService
    ) {
        this._upstream = new BehaviorSubject(null);
        this._tags = new BehaviorSubject([]);
        this._errorMsg = new BehaviorSubject('');
        this._laws = new BehaviorSubject([]);
        this._lawsCount = new BehaviorSubject(null);
        this._votes = new BehaviorSubject([]);
        this._votesCount = new BehaviorSubject(null);
        this._users = new BehaviorSubject([]);
        this._usersTotal = new BehaviorSubject(null);
    }

    get laws() { return this._laws.asObservable(); }
    get tags() { return this._tags.asObservable(); }
    get lawsCount() { return this._lawsCount.asObservable(); }
    get votes() { return this._votes.asObservable(); }
    get votesCount() { return this._votesCount.asObservable(); }
    get upstream() { return this._upstream.asObservable(); }
    get errorMsg() { return this._errorMsg.asObservable(); }
    get users() { return this._users.asObservable(); }
    get usersTotal() { return this._usersTotal.asObservable(); }

    clearLawMakers() { this._users.next([]); }

    loadUpstream(upstream: string) {
        this.upstreamService.getUpstream(upstream).catch((err: Response | any) => {
            if (err instanceof Response) {
                if (err.status === 404) {
                    return Observable.of(null);
                }
            }
            return Observable.throw(err);
        }).subscribe(
            res => {
                if (res == null) {
                    this.router.navigate(['/not-found']);
                    return;
                }
                this._upstream.next(res);
            },
            err => {
                const msg = ExtractError(err);
                this._errorMsg.next(msg);
            }
            );
    }

    loadLawMakers(upstream, pageSize, pageNum) {
        const msg = {
            opts: {
                upstream: upstream,
                page_size: pageSize,
                page_num: pageNum
            }
        };
        this.userService.listUsers(msg).subscribe(
            res => {
                if (res == null) {
                    return;
                }
                this._usersTotal.next(res.total);
                this._users.next(res.users);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
        );
    }

    loadUpstreamLaws(upstream, pageSize, pageNum, desc, orderBy, search) {
        let reqType = 1;
        if (search !== '') {
            reqType = 2;
        }
        const msg = {
            opts: {
                req_type: reqType,
                upstream: upstream,
                page_size: pageSize,
                page_num: pageNum,
                desc: desc,
                order_by: orderBy,
                search: search
            }
        };
        this.lawService.listLaws(msg).catch((err: Response | any) => {
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
                this._laws.next(res.laws);
                this._lawsCount.next(res.total);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
            );
    }

    loadUpstreamVotes(upstream, pageSize, pageNum) {
        const msg = {
            opts: {
                upstream: upstream,
                page_size: pageSize,
                page_num: pageNum
            }
        };
        this.ballotService.listVotes(msg).subscribe(
            res => {
                this._votes.next(res.votes);
                this._votesCount.next(res.total);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
        );
    }

}
