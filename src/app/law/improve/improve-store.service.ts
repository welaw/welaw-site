import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Law, Branch, Version, Author, LawSet } from '../law';
import { LawService } from '../law.service';
import { ExtractError } from '../../errors';
import { sameMessage } from '../../shared/format';

@Injectable()
export class ImproveStoreService {

    private _theirs: BehaviorSubject<LawSet>;
    private _mine: BehaviorSubject<LawSet>;
    private _newLaw: Subject<LawSet>;
    private _errorMsg: BehaviorSubject<any>;

    loadMineLast;
    loadTheirsLast;

    constructor(
        private router: Router,
        private lawService: LawService
    ) {
        this._theirs = new BehaviorSubject(null);
        this._mine = new BehaviorSubject(null);
        this._errorMsg = new BehaviorSubject('');
        this._newLaw = new Subject();
    }

    get theirs() { return this._theirs.asObservable(); }
    get mine() { return this._mine.asObservable(); }
    get newLaw() { return this._newLaw.asObservable(); }
    get errorMsg() { return this._errorMsg.asObservable(); }

    loadMine(upstream, ident, branch, version) {
        const msg = {
            upstream: upstream,
            ident: ident,
            opts: {
                branch: branch,
                version: version
            }
        };
        if (sameMessage(msg, this.loadMineLast)) {
            return;
        }
        this.loadMineLast = msg;
        this.lawService.getLaw(msg).catch((err: Response | any) => {
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
                    this.router.navigate(['/not-found']);
                    return;
                }
                this._mine.next(res);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(msg);
            }
            );
    }

    loadTheirs(upstream, ident, branch, version) {
        const msg = {
            upstream: upstream,
            ident: ident,
            opts: {
                branch: branch,
                version: version
            }
        };
        if (sameMessage(msg, this.loadTheirsLast)) {
            return;
        }
        this.loadTheirsLast = msg;
        this.lawService.getLaw(msg).catch((err: Response | any) => {
            if (err instanceof Response) {
                if (err.status === 404) {
                    return Observable.of(null);
                }
            }
            return Observable.of(err);
        }).subscribe(
            res => {
                if (res == null) {
                    this.router.navigate(['/not-found']);
                    return;
                }
                this._theirs.next(res);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
            );
    }

}
