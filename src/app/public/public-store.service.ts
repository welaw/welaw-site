import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Upstream } from '../upstream/upstream';
import { UpstreamService } from '../upstream/upstream.service';
import { ExtractError } from '../errors';

@Injectable()
export class PublicStoreService {

    private _upstreams: BehaviorSubject<Upstream[]>;
    private _errorMsg: BehaviorSubject<string>;

    constructor(
        private upstreamService: UpstreamService
    ) {
        this._upstreams = new BehaviorSubject([]);
        this._errorMsg = new BehaviorSubject('');
    }

    get upstreams() { return this._upstreams.asObservable(); }
    get errorMsg() { return this._errorMsg.asObservable(); }

    loadUpstreams() {
        const opts = {};
        this.upstreamService.listUpstreams(opts).subscribe(
            res => {
                this._upstreams.next(res);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
        );
    }

}
