import { Component, OnInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { LawSet } from '../law';
import { Vote } from '../../ballot/ballot';
import { User } from '../../user/user';
import { AuthStoreService } from '../../auth/auth-store.service';
import { LawStoreService } from '../law-store.service';
import { UpstreamStoreService } from '../../upstream/upstream-store.service';
import { BallotService } from '../../ballot/ballot.service';
import * as marked from 'marked';

@Component({
    selector: 'app-vote',
    templateUrl: './vote.component.html',
    styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit, OnDestroy {
    /*
    * show vote component instead
    *
    * right below
    * since already below right must have scrolled down?
    *
    * */
    pageIndex = 0;

    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 100];

    // MatPaginator Output
    pageEvent: PageEvent;

    law: Observable<LawSet>;
    lawValue: LawSet;

    user: Observable<User>;
    userValue: User;

    vote: Observable<Vote>;
    votes: Observable<Vote[]>;

    voteCtrl: FormGroup;

    viewBody: string;
    editBody: string;
    commentBody: string;

    voteOptions: string[];
    hasVoted = false;
    isVoting = false;
    v: string;
    reason: string;
    voteValue: string;
    read: boolean;

    filterOpts: string[] = ['All', 'Lawmakers', 'Public'];

    @ViewChild('lawbody') lawBody: ElementRef;

    routeSub;
    lawSub;
    userSub;
    voteSub;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authStoreService: AuthStoreService,
        private lawStoreService: LawStoreService,
        private upstreamStoreService: UpstreamStoreService,
        private ballotService: BallotService,
        private fb: FormBuilder
    ) {
        this.voteCtrl = fb.group({
            vote: '',
            comment: ''
        });
        this.voteOptions = ['Yay', 'Nay', 'Abstain'];
    }

    ngOnInit() {
        this.voteCtrl.disable();
        this.law = this.lawStoreService.law;
        this.vote = this.lawStoreService.vote;
        this.votes = this.lawStoreService.votes;
        this.user = this.authStoreService.user;
        this.routeSub = Observable.combineLatest(this.route.parent.params, this.user).subscribe(data => {
            const params = data[0];
            if (params == null) {
                return;
            }
            const user = data[1];
            if (user == null) {
                return;
            }
            this.lawStoreService.loadVote(user.username, params['upstream'], params['ident'], params['branch'], params['version']);
        });

        this.lawSub = this.law.subscribe(set => {
            if (set == null) {
                return;
            }
            if (set.version == null || set.version.body == null) {
                return;
            }
            this.viewBody = marked(set.version.body);
            this.editBody = set.version.body;
            this.lawValue = set;
            this.lawStoreService.loadVotes(set.law.upstream, set.law.ident, set.branch.name, set.version.version, 5, 0);
            // let element = this.lawBody.nativeElement;
            // let atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
            // if (
        });

        this.userSub = this.user.subscribe(user => {
            this.userValue = user;
        });

        this.voteSub = this.vote.subscribe(vote => {
            if (vote == null) {
                this.hasVoted = false;
                this.read = false;
                return;
            }
            this.voteCtrl.patchValue({
                vote: vote.vote,
                comment: vote.comment
            });
            this.hasVoted = true;
            this.read = true;
        });
    }

    ngOnDestroy() {
        this.lawSub.unsubscribe();
        this.userSub.unsubscribe();
        this.routeSub.unsubscribe();
        this.voteSub.unsubscribe();
    }

    signedIn() {
        return this.userValue != null;
    }

    submit() {
        // TODO if vote exists, update vote
        const s = this.lawValue;
        if (s == null) {
            return;
        }
        const vote = this.voteCtrl.value.vote;
        if (vote == null) {
            return;
        }
        if (this.userValue == null) {
            return;
        }
        const upstream = s.law.upstream;
        const ident = s.law.ident;
        const branch = s.branch.name;
        const version = s.version.version + '';
        const comment = this.voteCtrl.value.comment;
        if (this.hasVoted) {
            this.lawStoreService.updateVote(this.userValue.username, upstream, ident, branch, version, vote, comment);
        } else {
            this.lawStoreService.createVote(this.userValue.username, upstream, ident, branch, version, vote, comment);
        }
        this.isVoting = false;
    }

    beginVoting() {
        this.isVoting = true;
    }

    @HostListener('scroll', ['$event'])
    onScroll(e) {
        const element = this.lawBody.nativeElement;
        const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
        if (atBottom) {
            this.voteCtrl.enable();
        }
    }

}
