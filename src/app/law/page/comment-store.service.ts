import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Law, Branch, Version, Author, LawSet, Comment } from '../law';
import { CommentService } from '../comment.service';
import { ExtractError } from '../../errors';
import { sameMessage } from '../../shared/format';
import { AuthStoreService } from '../../auth/auth-store.service';

export enum CommentState {
    Load = 1,
    View,
    Edit,
    List
}

@Injectable()
export class CommentStoreService {

    private _state: BehaviorSubject<CommentState>;
    private _viewComment: BehaviorSubject<Comment>;
    private _userComment: BehaviorSubject<Comment>;
    private _comments: BehaviorSubject<Comment[]>;
    private _errorMsg: BehaviorSubject<any>;

    commentState: CommentState;
    loadViewCommentLast;
    loadUserCommentLast;
    loadCommentsLast;

    constructor(
        private router: Router,
        private commentService: CommentService,
        private authStoreService: AuthStoreService
    ) {
        this._state = new BehaviorSubject(null);
        this._viewComment = new BehaviorSubject(null);
        this._userComment = new BehaviorSubject(null);
        this._comments = new BehaviorSubject([]);
        this._errorMsg = new BehaviorSubject('');
    }

    get state() { return this._state.asObservable(); }
    setState(s: CommentState) {
        this._state.next(s);
    }
    get viewComment() { return this._viewComment.asObservable(); }
    clearViewComment() {
        this._viewComment.next(null);
        this.loadViewCommentLast = null;
    }
    get userComment() { return this._userComment.asObservable(); }
    clearUserComment() {
        this._userComment.next(null);
        this.loadUserCommentLast = null;
    }
    get comments() { return this._comments.asObservable(); }
    get errorMsg() { return this._errorMsg.asObservable(); }

    loadViewCommentByUid(uid: string) {
        const msg = {
            opts: {
                req_type: 1,
                uid: uid
            }
        }
        this.loadViewComment(msg);
    }

    loadViewComment(msg) {
        // if (sameMessage(msg, this.loadViewCommentLast)) {
        // return;
        // }
        // this.loadViewCommentLast = msg;
        // console.log('load view comment: %o', msg);
        this.commentService.getComment(msg).catch((err: Response | any) => {
            // console.log('load view comment: ERROR: %o', err);
            if (err instanceof Response) {
                if (err.status === 404 || err.status === 409) {
                    this._viewComment.next(null);
                    return Observable.of(null);
                }
            }
            return Observable.of(err);
        }).subscribe(
            res => {
                // console.log('load view comment: RESPONSE: %o', r);
                this._viewComment.next(res);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
            );
    }

    loadUserCommentByUserVersion(upstream, ident, branch, version, username) {
        const msg = {
            opts: {
                req_type: 0,
                upstream: upstream,
                ident: ident,
                branch: branch,
                version: version,
                username: username,
                quiet: true
            }
        }
        this.loadUserComment(msg);
    }

    loadUserComment(msg) {
        // console.log('load user comment: %o', msg);
        // if (sameMessage(msg, this.loadUserCommentLast)) {
        // return;
        // }
        // this.loadUserCommentLast = msg;
        this.commentService.getComment(msg).catch((err: Response | any) => {
            // console.log('load user comment: ERROR: %o', err);
            if (err instanceof Response) {
                if (err.status === 404 || err.status === 409) {
                    return Observable.of(null);
                }
                this._userComment.next(null);
            }
            return Observable.of(err);
        }).subscribe(
            res => {
                // console.log('load user comment: RESPONSE: %o', r);
                this._userComment.next(res);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
            );
    }

    loadComments(upstream, ident, branch, version: number, desc, orderBy, pageSize, pageNum) {
        const msg = {
            opts: {
                req_type: 1,
                upstream: upstream,
                ident: ident,
                branch: branch,
                version: version,
                desc: desc,
                order_by: orderBy,
                page_size: pageSize,
                page_num: pageNum
            }
        }
        // if (sameMessage(msg, this.loadCommentsLast)) {
        // return;
        // }
        // this.loadCommentsLast = msg;
        // console.log('load comments: %o', msg);
        this.commentService.listComments(msg).catch((err: Response | any) => {
            // console.log('load comments: error: %o', err);
            if (err instanceof Response) {
                if (err.status === 404 || err.status === 409) {
                    return Observable.of(null);
                }
                this._errorMsg.next(err);
                this._comments.next([]);
            }
            return Observable.of(err);
        }).subscribe(
            res => {
                // console.log('load comments: RESPONSE: %o', r);
                if (res == null) {
                    this._comments.next([]);
                    return;
                }
                this._comments.next(res);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
            );
    }

    createComment(upstream, ident, branch, version, comment) {
        const msg = {
            comment: {
                upstream: upstream,
                ident: ident,
                branch: branch,
                version: version,
                comment: comment
            }
        };
        // console.log('create comment: %o', msg);
        const u = this.authStoreService.getUser();
        if (u == null) {
            return;
        }
        this.commentService.createComment(msg).catch((err: Response | any) => {
            // console.log('create comment: ERROR: %o', err);
            if (err instanceof Response) {
                if (err.status === 404 || err.status === 409) {
                    return Observable.of(null);
                }
            }
            return Observable.of(err);
        }).subscribe(
            res => {
                // console.log('create comment: RESPONSE: %o', r);
                res.User = u;
                // console.log('create comment: RESPONSE UPDATED: %o', r);
                this._userComment.next(res);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
            );
    }

    updateComment(comment: Comment) {
        const msg = {
            comment: comment
            // comment: {
            //     uid: uid,
            //     comment: comment
            // }
        };
        // console.log('update comment: %o', msg);
        this.commentService.updateComment(msg).catch((err: Response | any) => {
            // console.log('update comment: ERROR: %o', err);
            if (err instanceof Response) {
                if (err.status === 404 || err.status === 409) {
                    return Observable.of(null);
                }
            }
            this._userComment.next(null);
            return Observable.of(err);
        }).take(1).subscribe(
            res => {
                 console.log('update comment: RESPONSE: %o', res);
                //const c = this._userComment.getValue();
                //this._userComment.next(Object.assign(c, res));
                this._userComment.next(res);
                //return this._userComment.getValue();
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
        );
    }

    likeComment(comment_id) {
        const msg = {
            opts: {
                comment_id: comment_id
            }
        };
        // console.log('like comment: %o', msg);
        const u = this.authStoreService.getUser();
        if (u == null) {
            return;
        }
        this.commentService.likeComment(msg).catch((err: Response | any) => {
            if (err instanceof Response) {
                if (err.status === 404 || err.status === 409) {
                    return Observable.of(null);
                }
            }
            return Observable.of(err);
        }).take(1).subscribe(
            res => {
                // console.log('like comment: RESPONSE: %o', res);
                // res.User = u;
                // console.log('like comment: RESPONSE UPDATED: %o', res);
                // this._userComment.next(res);
                // search for comment by id and update local copy
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
            );
    }

}
