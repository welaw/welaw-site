import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Comment } from '../../law';
import { CommentStoreService } from '../../page/comment-store.service';
import { AuthStoreService } from '../../../auth/auth-store.service';
import { avatarErrorURL } from '../../../shared/format';

@Component({
    selector: 'app-comment-item',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

    @Input() comment: Comment;
    @Output() selectedChange = new EventEmitter<Object>();

    selected: boolean;
    bgColor: string;
    viewCommentSub;

    constructor(
        private authStoreService: AuthStoreService,
        private commentStoreService: CommentStoreService
    ) { }

    ngOnInit() {
        this.viewCommentSub = this.commentStoreService.viewComment.subscribe(c => {
            if (c == null) {
                this.setSelected(false);
                return;
            }
            if (this.comment == null) {
                this.setSelected(false);
                return;
            }
            if (c.uid === this.comment.uid) {
                this.setSelected(true);
            } else {
                this.setSelected(false);
            }
        });
    }

    setSelected(b: boolean) {
        if (b) {
            this.bgColor = 'silver';
        } else {
            this.bgColor = 'white';
        }
        this.selected = b;
    }

    onSelected(e) {
        // if (this.selected) {
        // this.bgColor = 'silver';
        // } else {
        // this.bgColor = 'white';
        // }
        if (this.comment == null) {
            return;
        }
        if (this.selected) {
            this.commentStoreService.clearViewComment();
            this.setSelected(false);
        } else {
            this.commentStoreService.loadViewCommentByUid(this.comment.uid);
            this.setSelected(true);
        }
        this.selectedChange.emit({ selected: this.selected, uid: this.comment.uid });
        console.log('liked: %o', this.comment.liked);
    }

    avatarUrlError(e) {
        if (this.comment == null || this.comment.user == null) {
            return;
        }
        this.comment.user.picture_url = avatarErrorURL(this.comment.user.username);
    }

    like() {
        if (!this.loggedIn()) {
            return;
        }
        if (this.comment == null || this.comment.liked) {
            return;
        }
        this.commentStoreService.likeComment(this.comment.uid);
    }

    loggedIn() {
        return this.authStoreService.isLoggedIn();
    }

    liked() {
        if (this.comment == null) {
            return false;
        }
        return this.comment.liked;
    }
}
