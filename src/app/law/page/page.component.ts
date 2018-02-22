import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material';
import { LawStoreService } from '../law-store.service';
import { UpstreamStoreService } from '../../upstream/upstream-store.service';
import { CommentStoreService, CommentState } from './comment-store.service';
import { Law, LawSet, Comment } from '../law';
import { LawService } from '../law.service';
import { Upstream } from '../../upstream/upstream';
import { AuthStoreService } from '../../auth/auth-store.service';
import * as annotator from 'annotator';
import { ConsoleLoggerService } from '../../shared/logging/console-logger';

const defaultLawHeight = '450px';

@Component({
    selector: 'app-law',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css']
})
export class LawPageComponent implements OnInit, OnDestroy, AfterViewChecked {

    upstream: Observable<Upstream>;
    @ViewChild('lawbody') lawBody: ElementRef;
    @ViewChild('commentsRef') commentsRef: ElementRef;
    ann;

    lawValue: LawSet;
    law: Observable<LawSet>;
    viewComment: Observable<Comment>;
    userComment: Observable<Comment>;
    comments: Observable<Comment[]>;
    errorMsg: Observable<string>;

    branches: Observable<LawSet[]>;
    versionCount;
    loading: boolean;
    userCommentValue: Comment;
    viewCommentValue: Comment;

    lawHeight: string;
    ourBranch: string;
    ourVersion: string;
    theirBranch: string;
    worker;

    fragment: string;
    fragmentScroll: boolean;
    userComments: string;
    commentState: CommentState;

    expanded: boolean;

    lawSub;
    viewCommentSub;
    userCommentSub;

    viewBody: string;
    editBody: string;

    arrow: string;
    pageIndex = 0;
    options;

    desc = true;
    orderBy = 'date';

    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 100];

    // MatPaginator Output
    pageEvent: PageEvent | void;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private logger: ConsoleLoggerService,
        private lawService: LawService,
        private lawStoreService: LawStoreService,
        private authStoreService: AuthStoreService,
        private commentStoreService: CommentStoreService,
        private upstreamStoreService: UpstreamStoreService
    ) {
        // this.lawHeight = 'auto';
        this.lawHeight = defaultLawHeight;
        this.ourBranch = 'master';
        this.ourVersion = 'latest';
        this.theirBranch = '';
    }

    ngOnInit() {
        this.upstream = this.upstreamStoreService.upstream;
        this.law = this.lawStoreService.law;
        this.branches = this.lawStoreService.branches;
        this.viewComment = this.commentStoreService.viewComment;
        this.userComment = this.commentStoreService.userComment;
        this.comments = this.commentStoreService.comments;

        this.lawSub = this.law.subscribe(data => {
            this.loading = true;
            if (data == null || data.version == null) {
                return;
            }
            this.lawValue = data;
            if (data.version.body == null) {
                this.viewBody = '';
                this.editBody = '';
                return;
            }
            if (data.branch != null) {
                this.ourBranch = data.branch.name;
            }
            this.worker = new Worker('./assets/worker_markdown.js');
            const comp = this;
            this.worker.addEventListener('message', function(e) {
                comp.loading = false;
                comp.viewBody = e.data;
                comp.editBody = data.version.body;

                if (comp.fragment === 'comments') {
                    if (comp.commentsRef != null && comp.commentsRef.nativeElement != null) {
                        comp.fragmentScroll = true;
                        setTimeout(() => {
                            comp.commentsRef.nativeElement.scrollIntoView();
                        }, 500);
                    }
                }
            });
            this.worker.postMessage(data.version.body);
            this.commentStoreService.loadComments(
                data.law.upstream,
                data.law.ident,
                data.branch.name,
                data.version.version,
                this.desc,
                this.orderBy,
                this.pageSize,
                this.pageIndex
            );
            const u = this.authStoreService.getUser();
            if (u == null) {
                return;
            }
            this.commentStoreService.loadUserCommentByUserVersion(
                data.law.upstream,
                data.law.ident,
                data.branch.name,
                data.version.version,
                u.username
            )
        });

        this.userCommentSub = this.userComment.subscribe(c => {
            this.userCommentValue = c;
        });

        this.viewCommentSub = this.viewComment.subscribe(c => {
            this.logger.info('view comment updated: %o', c);
            this.logger.info('state: %o', this.commentState);
            this.viewCommentValue = c;
            if (c == null) {
                this.killAnn();
                return;
            }
            if (c.uid == null || c.uid === '') {
                this.killAnn();
                return;
            }
            if (this.commentState !== CommentState.View && this.commentState !== CommentState.Edit && this.commentState !== CommentState.List) {
                this.killAnn();
                return;
            }
            this.createAnnotator(c.uid);
        });

        // this.router.events.subscribe(s => {
            // console.log('router event: %o', s);
            // if (s instanceof NavigationEnd) {
                // const tree = this.router.parseUrl(this.router.url);
                // if (tree.fragment) {
                    // const ele = document.querySelector('#' + tree.fragment);
                    // if (ele) {
                        // console.log('scrolling');
                        // ele.scrollIntoView();
                    // } else {
                        // console.log('not found');
                    // }
                // } else {
                    // console.log(' no tree');
                // }
            // } else {
                // console.log('not instance');
            // }
        // });
    }

    ngAfterViewChecked() {
                // if (this.commentsRef != null && this.commentsRef.nativeElement != null) {
        this.route.fragment.take(1).subscribe((hash: string) => {
            this.fragment = hash;

            if (this.fragmentScroll) {
                return;
            }
            if (this.fragment === 'comments') {
                if (this.commentsRef != null && this.commentsRef.nativeElement != null) {
                    this.fragmentScroll = true;
                    this.commentsRef.nativeElement.scrollIntoView();
                }
            }
        });
        // });
    }

    ngOnDestroy() {
        if (this.lawSub != null) {
            this.lawSub.unsubscribe();
        }
        if (this.viewCommentSub != null) {
            this.viewCommentSub.unsubscribe();
        }
        if (this.userCommentSub != null) {
            this.userCommentSub.unsubscribe();
        }
    }

    killAnn() {
        if (this.ann != null) {
            this.ann.destroy();
        }
    }

    createAnnotator(comment_id: string) {
        if (this.lawBody == null || this.lawBody.nativeElement == null) {
            this.ann.destroy();
            return;
        }
        if (comment_id == null || comment_id === '') {
            return;
        }
        if (this.ann != null) {
            this.ann.destroy();
        }

        // console.log('create_annotator: %o', comment_id);
        const ann = new annotator.App();

        ann.include(annotator.ui.main, {
            element: this.lawBody.nativeElement,
            viewerExtensions: [
                annotator.ui.tags.viewerExtension
            ]
        });
        ann.include(annotator.storage.http, {
            prefix: this.lawService.host() + '/comment',
            annotationData: {
                'uri': window.location.href
            },
            loadFromSearch: {
                'limit': 20,
                'uri': window.location.href
            },
            urls: {
                create: '/annotation/create',
                update: '/annotation/update/{id}',
                destroy: '/annotation/delete/{id}',
                search: '/annotation/list'
            }
        });
        ann.include(function() {
            return {
                beforeAnnotationCreated: function (annotation) {
                    annotation.comment_id = comment_id;
                }
            }
        });
        ann.start().then(function() {
            ann.annotations.load({
                req_type: 'BY_COMMENT',
                comment_id: comment_id
            });
        });
        this.ann = ann;
        return ann;
    }

    onToggleAnnotatorView(e) {
        if (e) {
            this.createAnnotator(this.viewCommentValue.uid);
        }
    }

    onCommentStateChanged(state: CommentState) {
        // console.log('comment state changed: %o', state);
        this.commentState = state;
        switch (state) {
            case CommentState.Load:
                this.killAnn();
                break;
            case CommentState.View:
                if (this.lawValue == null) {
                    return;
                }
                // this.commentStoreService.loadViewCommentByUserVersion(
                    // this.lawValue.law.upstream,
                    // this.lawValue.law.ident,
                    // this.lawValue.branch.name,
                    // this.lawValue.version.version
                // );
                break;
            case CommentState.Edit:
                //  TODO verify killed
                if (this.userCommentValue == null || this.userCommentValue.uid === '') {
                    return;
                }
                this.createAnnotator(this.userCommentValue.uid);
                break;
            case CommentState.List:
                this.killAnn();
                if (this.lawValue == null) {
                    return;
                }
                const l = this.lawValue;
                this.commentStoreService.loadComments(
                    l.law.upstream,
                    l.law.ident,
                    l.branch.name,
                    l.version.version,
                    this.desc,
                    this.orderBy,
                    this.pageSize,
                    this.pageIndex
                );
                break;
            default:
                this.killAnn();
                console.log('undefined comment_state: %o', state);
        }
        // if (commenting && this.viewCommentValue != null) {
            // this.createAnnotator(this.viewCommentValue.uid);
            //  if comment not saved .. delete annotations and comment
            //  else update comment to enabled
            //  close commenting
            //     - add delete comment .. deletes comment and all annotations (hard)
            //     - add enable comment .. updates comment to enabled
    }

    onCommentSelected(e) {
        // this.commentStoreService.clearViewComment();
        if (e.selected) {
            this.commentStoreService.loadViewCommentByUid(e.uid);
        // } else {
            // this.commentStoreService.setViewComment(null);
        }
    }

    collapse() {
        this.expanded = false;
        this.lawHeight = defaultLawHeight;
    }

    expand() {
        this.expanded = true;
        this.lawHeight = 'auto';
    }

    // gotoHashtag(fragment: string) {
        //  let url = '';
        //  let urlWithSegments = this._router.url.split('#');

        //  if(urlWithSegments.length){
          //  url = urlWithSegments[0];
        //  }

        //  window.location.hash = fragment;
        //  const element = document.querySelector('#' + fragment);
        //  if (element) element.scrollIntoView(element);
    // }
}
