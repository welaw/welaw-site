import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { UserStoreService } from '../user-store.service';
import { User, UserProfile } from '../user';
import { Vote } from '../../ballot/ballot';
import { LawSet } from '../../law/law';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import * as CalHeatMap from 'cal-heatmap';

@Component({
    selector: 'app-user-votes',
    templateUrl: './votes.component.html',
    styleUrls: ['./votes.component.css']
})
export class UserVotesComponent implements OnInit, OnDestroy {

    pageIndex = 0;

    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 100];

    // MatPaginator Output
    pageEvent: PageEvent;

    orderBy: string;
    desc: boolean;
    search: string;

    user: Observable<User>;
    userSub;

    votes: Observable<Vote[]>;
    votesSub;

    laws: Observable<LawSet[]>;

    profile: Observable<UserProfile>;
    profileErr: Observable<string>;

    routeSub;

    cal;
    data;

    hasVotes: boolean;
    searchCtrl: FormControl;
    filtered: Observable<string[]>;
    terms: Observable<string[]>;
    votesTotal: Observable<number>;
    votesValue: Vote[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userStoreService: UserStoreService
    ) {
        this.searchCtrl = new FormControl();
        this.filtered = Observable.of([]);
        // this.filtered = this.searchCtrl.valueChanges.pipe(
        // startWith(''),
        // map(term => term ? this.filterTerms(term) : this.votesValue.slice())
        // );
    }

    // filterTerms(f: string) {
    // return this.filtered.filter(term => term.toLowerCase().indexOf(f.toLowerCase()) === 0);
    // }

    ngOnInit() {
        this.user = this.userStoreService.user;
        this.laws = this.userStoreService.laws;
        this.votes = this.userStoreService.votes;
        this.votesTotal = this.userStoreService.votesTotal;

        this.votesSub = this.votes.subscribe(votes => {
            if (votes == null) {
                return;
            }
            const data = {};
            for (const vote of votes) {
                if (vote.cast_at in data) {
                    data[vote.cast_at] += 1;
                } else {
                    data[vote.cast_at] = 1;
                }
            }
            if (this.cal == null) {
                this.createCal();
            }
            this.cal.update(data);

            this.votesValue = votes;
            if (votes.length > 0) {
                this.hasVotes = true;
            } else {
                this.hasVotes = false;
            }
        });

        this.userSub = this.user.subscribe(u => {
            if (u == null) {
                return;
            }
            this.userStoreService.loadUserVotes(u.username, this.orderBy, this.desc, this.search, this.pageIndex, this.pageSize);
        });

        if (this.cal == null) {
            this.createCal();
        }
    }

    ngOnDestroy() {
        if (this.votesSub != null) {
            this.votesSub.unsubscribe();
        }
        if (this.userSub != null) {
            this.userSub.unsubscribe();
        }
    }

    isUpstreamUser() {
        return this.user.map(r => {
            if (r == null) {
                return false;
            }
            if (r.upstream == null) {
                return false;
            }
            return r.username !== '';
        });
    }

    parserFunc(cons) {
        const data = {};
        for (const c of cons) {
            const d = new Date(c.date);
            data[d.getTime()] = 100;
        }
        return data;
    }

    onResize(e) {
        if (this.cal != null) {
            this.cal.destroy();
        }
        this.createCal()
    }

    createCal() {
        const width = window.screen.width;
        const d = new Date();
        let range;
        if (width >= 700) {
            range = 12;
            d.setMonth(d.getMonth() - 11);
        } else {
            range = 4;
            d.setMonth(d.getMonth() - 3);
        }
        this.cal = new CalHeatMap();
        this.cal.init({
            itemSelector: '#heatmap-votes',
            domain: 'month',
            subDomain: 'day',
            range: range,
            // data: p.contributions,
            data: {},
            // considerMissingDataAsZero: true,
            highlight: 'now',
            // afterLoadData: this.parserFunc,
            start: d,
            cellRadius: 3,
            cellPadding: 3,
            legendColors: {
                min: '#FFCCBC',
                max: '#FF5722',
                empty: 'white',
                base: 'white',
                overflow: 'white'
            },
            // legend: [1, 50, 100],
            // legendVerticalPosition: 'center',
            // legendHorizontalPosition: 'left',
            // legendOrientation: 'vertical',
            maxDate: new Date()
        });
    }

    isOwner(username: string) {
        return true;
    }

    getWidth() {
        return window.screen.width;
    }

}
