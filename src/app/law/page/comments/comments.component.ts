import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthStoreService } from '../../../auth/auth-store.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { LawStoreService } from '../../law-store.service';
import { LawSet, Comment } from '../../law';
import { isMobile } from '../../../shared/format';
import { CommentStoreService, CommentState } from '../comment-store.service';

@Component({
    selector: 'app-law-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnChanges {

    @Input() law: LawSet;
    @Input() viewComment: Comment;
    @Input() userComment: Comment;
    @Output() stateChange = new EventEmitter<CommentState>();
    @Output() commentIdChange = new EventEmitter<string>();

    show: boolean;
    commenting: boolean;
    loading: boolean;
    commentCtrl: FormGroup;
    state: CommentState;

    constructor(
        private fb: FormBuilder,
        private commentStoreService: CommentStoreService,
        private lawStoreService: LawStoreService,
        private authStoreService: AuthStoreService
    ) {
        this.state = CommentState.List;
        this.commentCtrl = fb.group({
            comment: ''
        });
    }

    ngOnInit() {
        this.stateChange.emit(this.state);
    }

    ngOnChanges(c: SimpleChanges) {
        if (c == null) {
            return;
        }
        if (c.userComment == null || c.userComment.currentValue == null) {
            return;
        }
        this.userComment = c.userComment.currentValue;
        this.commentCtrl.patchValue({ comment: this.userComment.comment });
        if (this.loading) {
            this.commenting = true;
            this.loading = false;
            this.state = CommentState.Edit;
            this.stateChange.emit(this.state);
        }
    }

    createComment() {
        if (this.userComment != null && this.userComment.uid !== '') {
            this.state = CommentState.Edit;
            this.stateChange.emit(this.state);
            return;
        }
        // create the first comment
        this.commentStoreService.createComment(
            this.law.law.upstream,
            this.law.law.ident,
            this.law.branch.name,
            this.law.version.version,
            this.commentCtrl.value.comment
        );
        this.loading = true;
        this.state = CommentState.Load;
        this.stateChange.emit(this.state);
    }

    updateComment() {
        if (this.userComment == null || this.userComment.uid === '') {
            return;
        }
        this.commenting = true;
        this.state = CommentState.Edit;
        this.stateChange.emit(this.state);
        return;
    }

    submit() {
        const c = this.userComment;
        if (c == null || c.uid === '') {
            return;
        }
        c.comment = this.commentCtrl.value.comment;
        this.commentStoreService.updateComment(c);
        this.commenting = false;
        setTimeout(() => {
            this.state = CommentState.List;
            this.stateChange.emit(this.state);
        }, 100);
    }

    onCommentSelected(e) {
        // this.commentStoreService.clearViewComment();
        if (e.selected) {
            this.commentStoreService.loadViewCommentByUid(e.uid);
            this.state = CommentState.View;
            this.stateChange.emit(this.state);
            this.commentIdChange.emit(e.uid);
            // } else {
            // this.commentStoreService.setViewComment(null);
        }
    }

    isMobile() {
        return isMobile();
    }

    cancel() {
        this.commenting = false;
        this.state = CommentState.List;
        this.stateChange.emit(this.state);
    }

    loggedIn() {
        return this.authStoreService.isLoggedIn();
    }

}

