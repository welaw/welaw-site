import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Law, Branch, Version, Author, LawSet } from './law';
import { LawService } from './law.service';
import { BallotService } from '../ballot/ballot.service';
import { Vote } from '../ballot/ballot';
import { ExtractError } from '../errors';
import { sameMessage } from '../shared/format';

@Injectable()
export class LawStoreService {

    private _law: BehaviorSubject<LawSet>;
    private _myLaw: BehaviorSubject<LawSet>;
    private _vote: BehaviorSubject<Vote>;
    private _votes: BehaviorSubject<Vote[]>;
    private _votesCount: BehaviorSubject<number>;
    private _branches: BehaviorSubject<LawSet[]>;
    private _versions: BehaviorSubject<LawSet[]>;
    private _newLaw: Subject<LawSet>;
    private _errorMsg: BehaviorSubject<any>;

    loadLawVersionLast;
    loadCommentLast;
    loadCommentsLast;
    loadLawBranchesLast;
    loadVoteLast;

    constructor(
        private router: Router,
        private ballotService: BallotService,
        private lawService: LawService
    ) {
        this._law = new BehaviorSubject(new LawSet());
        this._myLaw = new BehaviorSubject(new LawSet());
        this._vote = new BehaviorSubject(new Vote());
        this._votes = new BehaviorSubject([]);
        this._votesCount = new BehaviorSubject(0);
        this._branches = new BehaviorSubject([]);
        this._newLaw = new Subject();
        this._versions = new BehaviorSubject([]);
        this._errorMsg = new BehaviorSubject('');
    }

    get law() { return this._law.asObservable(); }
    get myLaw() { return this._myLaw.asObservable(); }
    get vote() { return this._vote.asObservable(); }
    get votes() { return this._votes.asObservable(); }
    get votesCount() { return this._votesCount.asObservable(); }
    get branches() { return this._branches.asObservable(); }
    get newLaw() { return this._newLaw.asObservable(); }
    get versions() { return this._versions.asObservable(); }
    get errorMsg() { return this._errorMsg.asObservable(); }

    createLawVersion(branch, version, set) {
        const msg = {
            'opts': {
                'branch': branch,
                'version': version
            },
            'law_set': set
        };
        this.lawService.createLaw(msg).take(1).subscribe(
            res => {
                this._newLaw.next(res);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
        );
    }

    loadLawVersion(upstream, ident, branch, version) {
        const msg = {
            upstream: upstream,
            ident: ident,
            opts: {
                branch: branch,
                version: version
            }
        };
        // if (sameMessage(msg, this.loadLawVersionLast)) {
        // return;
        // }
        // this.loadLawVersionLast = msg;
        this.lawService.getLaw(msg).catch((err: Response | any) => {
            if (err instanceof Response) {
                if (err.status === 404) {
                    return Observable.of(null);
                }
            }
            return Observable.of(err);
        }).take(1).subscribe(
            res => {
                this._law.next(res);
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
            return Observable.of(err);
        }).take(1).subscribe(
            res => {
                if (res == null) {
                    this._versions.next([]);
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

    loadLawBranches(upstream, ident) {
        const msg = {
            opts: {
                req_type: 3,
                upstream: upstream,
                ident: ident,
                branches: true
            }
        };
        // if (sameMessage(msg, this.loadLawBranchesLast)) {
        // return;
        // }
        // this.loadLawBranchesLast = msg;
        this.lawService.listLaws(msg).catch((err: Response | any) => {
            if (err instanceof Response) {
                if (err.status === 404) {
                    return Observable.of(null);
                }
            }
            return Observable.of(err);
        }).take(1).subscribe(
            data => {
                if (data == null) {
                    this._branches.next([]);
                    return;
                }
                this._branches.next(data.laws);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
            );
    }

    createVote(username, upstream, ident, branch, version, vote, comment) {
        const msg = {
            vote: {
                username: username,
                upstream: upstream,
                branch: branch,
                ident: ident,
                vote: vote,
                comment: comment
            },
            opts: {
                version: version
            }
        };
        this.ballotService.createVote(msg).catch((err: Response | any) => {
            if (err instanceof Response) {
                if (err.status === 404 || err.status === 409) {
                    return Observable.of(null);
                }
            }
            return Observable.of(err);
        }).take(1).subscribe(
            res => {
                this._vote.next(res);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
            );
    }

    updateVote(username, upstream, ident, branch, version, vote, comment) {
        const msg = {
            vote: {
                username: username,
                upstream: upstream,
                branch: branch,
                ident: ident,
                vote: vote,
                comment: comment
            },
            opts: {
                version: version
            }
        };
        this.ballotService.updateVote(msg).catch((err: Response | any) => {
            if (err instanceof Response) {
                if (err.status === 404 || err.status === 409) {
                    return Observable.of(null);
                }
            }
            return Observable.of(err);
        }).take(1).subscribe(
            res => {
                if (res == null) {
                    this._vote.next(null);
                    return;
                }
                this._vote.next(res.vote);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
            );
    }

    loadVote(username, upstream, ident, branch, version) {
        const msg = {
            upstream: upstream,
            ident: ident,
            opts: {
                username: username,
                branch: branch,
                version: version,
                quiet: true
            }
        };
        if (sameMessage(msg, this.loadVoteLast)) {
            // console.log('is same: %o = %o', msg, this.loadVoteLast);
            return;
        }
        this.loadVoteLast = msg;
        // console.log('load_vote: %o', msg);
        this.ballotService.getVote(msg).catch((err: Response) => {
            if (err instanceof Response) {
                if (err.status === 404) {
                    return Observable.of(null);
                }
            }
            return Observable.of(err);
        }).take(1).subscribe(
            res => {
                // console.log('load_vote: RESPONSE: %o', res);
                this._vote.next(res);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
            );
    }

    loadVotes(upstream, ident, branch, version, pageSize, pageNum) {
        const msg = {
            opts: {
                upstream: upstream,
                ident: ident,
                branch: branch,
                version: version,
                page_size: parseInt(pageSize, 10),
                page_num: parseInt(pageNum, 10)
            }
        };
        // console.log('load_votes: %o', msg);
        this.ballotService.listVotes(msg).catch((err: Response | any) => {
            if (err instanceof Response) {
                if (err.status === 404) {
                    return Observable.of(null);
                }
            }
            return Observable.of(err);
        }).take(1).subscribe(
            res => {
                // console.log('load_votes: RESPONSE: %o', res);
                if (res == null) {
                    this._votes.next([]);
                    this._votesCount.next(0);
                    return;
                }
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
