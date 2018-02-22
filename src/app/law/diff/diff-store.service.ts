import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Law, Branch, Version, Author, LawSet } from '../law';
import { LawService } from '../law.service';
import { ExtractError } from '../../errors';

@Injectable()
export class DiffStoreService {

    private _diff: BehaviorSubject<string>;
    private _theirs: BehaviorSubject<LawSet>;
    private _versions: BehaviorSubject<LawSet[]>;
    private _errorMsg: BehaviorSubject<any>;

    constructor(
        private router: Router,
        private lawService: LawService
    ) {
        this._diff = new BehaviorSubject(null);
        this._theirs = new BehaviorSubject(null);
        this._versions = new BehaviorSubject([]);
        this._errorMsg = new BehaviorSubject('');
    }

    get diff() { return this._diff.asObservable(); }
    get theirs() { return this._theirs.asObservable(); }
    get versions() { return this._versions.asObservable(); }
    get errorMsg() { return this._errorMsg.asObservable(); }

    loadDiff(upstream, ident, ourBranch, ourVersion, theirBranch, theirVersion) {
        const msg = {
            upstream: upstream,
            ident: ident,
            opts: {
                our_branch: ourBranch,
                our_version: ourVersion,
                their_branch: theirBranch,
                their_version: theirVersion
            }
        }
        this._diff.next('');
        this.lawService.diffLaws(msg).catch((err: Response | any) => {
            if (err instanceof Response) {
                if (err.status === 404) {
                    return Observable.of(null);
                }
            }
            this._errorMsg.next('' + err);
            return Observable.of(err);
        }).subscribe(
            res => {
                if (res == null) {
                    this._theirs.next(null);
                    this._diff.next(null);
                }
                this._theirs.next(res.theirs);
                this._diff.next(res.diff);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
            );
    }

    loadBranchVersions(upstream, ident, branch) {
        const msg = {
            opts: {
                req_type: 4,
                upstream: upstream,
                ident: ident,
                branch: branch
            }
        };
        this.lawService.listLaws(msg).catch((err: Response | any) => {
            if (err instanceof Response) {
                if (err.status === 404) {
                    return Observable.of(null);
                }
            }
            this._errorMsg.next('' + err);
            return Observable.of(err);
        }).subscribe(
            res => {
                if (res == null) {
                    this._versions.next(null);
                    return;
                }
                this._versions.next(res.laws);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
            );
    }

}
