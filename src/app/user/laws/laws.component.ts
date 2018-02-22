import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { UserStoreService } from '../user-store.service';
import { PageEvent } from '@angular/material';
import { User, UserProfile } from '../user';
import { Vote } from '../../ballot/ballot';
import { LawSet } from '../../law/law';
import * as CalHeatMap from 'cal-heatmap';
import * as moment from 'moment';
import { isMobile } from '../../shared/format';

@Component({
    selector: 'app-user-laws',
    templateUrl: './laws.component.html',
    styleUrls: ['./laws.component.css']
})

export class UserLawsComponent implements OnInit, OnDestroy {

    // TODO  if mobile, display month only in heat map

    user: Observable<User>;
    userSub;
    userValue: User;

    laws: Observable<LawSet[]>;
    lawsSub;

    lawsTotalSub;

    profile: Observable<UserProfile>;
    profileErr: Observable<string>;

    cal;
    data;

    pageIndex = 0;

    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 100];

    // MatPaginator Output
    pageEvent: PageEvent | void;

    orderBy = 'date';
    desc: boolean;
    search: string;
    hasLaws: boolean;

    terms: Observable<string[]>;
    votesValue: Vote[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userStoreService: UserStoreService
    ) { }

    ngOnInit() {
        this.user = this.userStoreService.user;

        this.laws = this.userStoreService.laws;
        this.lawsSub = this.laws.subscribe(laws => {
            if (laws == null) {
                return;
            }
            const data = {};
            for (const law of laws) {
                if (law.version.published_at.seconds in data) {
                    data[law.version.published_at.seconds] += 1;
                } else {
                    data[law.version.published_at.seconds] = 1;
                }
            }

            if (this.cal == null) {
                this.createCal();
            }

            this.cal.update(data);
            if (laws.length > 0) {
                this.hasLaws = true;
            } else {
                this.hasLaws = false;
            }
        });

        this.lawsTotalSub = this.userStoreService.lawsTotal.subscribe(t => {
            this.length = t;
        });

        this.userSub = this.user.subscribe(u => {
            if (u == null) {
                return;
            }
            this.userValue = u;
            this.userStoreService.loadUserLaws(u.username, this.orderBy, this.desc, this.pageSize, this.pageIndex);
        });

        if (this.cal == null) {
            this.createCal();
        }
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
        const data = {};
        const currentMonth = 0;
        this.cal = new CalHeatMap();
        this.cal.init({
            itemSelector: '#heatmap-laws',
            domain: 'month',
            // subDomain: 'day',
            range: range,
            data: data,
            // considerMissingDataAsZero: true,
            highlight: 'now',
            // afterLoadData: this.parserFunc,
            start: d,
            cellRadius: 3,
            cellPadding: 3,
            legendColors: {
                // min: '#FFCCBC',
                // max: '#FF5722',
                min: '#FFCDD2',
                max: '#D32F2F',
                empty: 'white',
                base: 'white',
                overflow: 'white'
            },
            // legendVerticalPosition: top,
            // legendMargin: [0, 0, 10, 0],
            // legend: [1, 50, 100],
            // legendVerticalPosition: 'center',
            // legendHorizontalPosition: 'left',
            // legendOrientation: 'vertical',
            maxDate: new Date()
            // domainLabelFormat: function (date) { //x-axis labels
            // var md = moment(date);
            // //console.log('md.month()=%o', md.month());
            // //console.log('currentMonth=%o', currentMonth);
            // //only show the label for the first domain of the month
            // if (md.month() == currentMonth)
            // return '';

            // //reset the current month
            // currentMonth = md.month();
            // //return the label
            // return md.format('MMM');
            // }
        });
    }

    onFilterChanged(event) {
        this.orderBy = event.selectedOpt;
        this.desc = event.desc;
        this.search = event.search;
        // this.userStoreService.loadUserLaws(this.ident, this.orderBy, this.desc, event.pageSize, event.pageIndex);
    }

    // var currentMonth = settings.start;
    // settings.domainLabelFormat = function (date) { //x-axis labels
    // var md = moment(date);
    // //only show the label for the first domain of the month
    // if (md.month() == currentMonth)
    // return '';

    // //reset the current month
    // currentMonth = md.month();
    // //return the label
    // return md.format('MMM');
    // };

    // parserFunc(cons) {
    // let data = {};
    // for (let c of cons) {
    // console.log('date: ' + c.date);
    // let d = new Date(c.date);
    // data[d.getTime()] = 100;
    // }
    // console.log('data: %o', data);
    // return data;
    // }

    ngOnDestroy() {
        if (this.lawsSub != null) {
            this.lawsSub.unsubscribe();
        }
        if (this.cal != null) {
            this.cal = this.cal.destroy();
        }
    }

    getServerData(event) {
        if (this.userValue == null) {
            return;
        }
        this.userStoreService.loadUserLaws(this.userValue.username, this.orderBy, this.desc, event.pageSize, event.pageIndex);
    }

    isMobile() {
        return isMobile();
    }
}
