import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UpstreamStoreService } from '../../../upstream/upstream-store.service';
import { LawStoreService } from '../../law-store.service';
import { LawSet, LawTag, getDate } from '../../law';
import { Upstream } from '../../../upstream/upstream';

@Component({
    selector: 'app-law-item-body-desktop',
    templateUrl: './body-desktop.component.html',
    styleUrls: ['./body-desktop.component.css']
})
export class LawItemBodyDesktopComponent implements OnInit, OnChanges {

    @Input() upstream: Upstream;
    @Input() law: LawSet;
    @Input() branches: LawSet[];
    @Input() versions: LawSet[];
    @Input() tags: LawTag[];

    noFlex: number;
    noColor: string;
    yesFlex: number;
    yesColor: string;
    branch: string;
    version: string;
    d: Date;

    months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.d = new Date(1970, 0, 1);
    }

    setVotesStyle(law: LawSet) {
        let y = 0;
        let n = 0;
        if (law != null && law.version != null) {
            if (law.version.yays != null) {
                y = law.version.yays;
            }
            if (law.version.nays != null) {
                n = law.version.nays;
            }
        }
        if (y === 0 && n === 0) {
            this.noColor = '#BDBDBD';
            this.yesColor = '#9E9E9E';
            this.noFlex = 1;
            this.yesFlex = 1;
        } else {
            if (n === 0) {
                this.noColor = '#BDBDBD';
            } else {
                this.noColor = '#FFCDD2';
            }
            if (y === 0) {
                this.yesColor = '#9E9E9E';
            } else {
                this.yesColor = '#00C853';
            }
            this.noFlex = Math.round(1 + 9 * (n / (y + n)));
            this.yesFlex = Math.round(1 + 9 * (y / (y + n)));
            // this.noFlex = Math.round(100 * (n / (y + n)));
            // this.yesFlex = Math.round(100 * (y / (y + n)));
        }
    }

    ngOnInit() {
        this.d = getDate(this.law);
        this.setVotesStyle(this.law);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.law == null) {
            return;
        }
        const c = <LawSet>changes.law.currentValue;
        if (c != null && c.version != null) {
            this.setVotesStyle(c);
            this.d = getDate(c);
            this.branch = c.branch.name;
            this.version = '' + c.version.version;
        }
    }

    hasVoted(): boolean {
        return true;
    }

    // isOverflown(element) {
    // return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    // }
    //
    // getNoVotes() {
    // if (this.law == undefined || this.law.version == undefined || this.law.version == undefined) {
    // return 0;
    // }
    // let n = this.law.version..nays == undefined ? 0 : this.law.version.vote_summary.nays;
    // let un = this.law.version.vote_summary.upstream_nays == undefined ? 0 : this.law.version.vote_summary.upstream_nays;
    // return n + un;
    // }

    // getYesVotes() {
    // if (this.law == undefined || this.law.version == undefined || this.law.version.vote_summary == undefined) {
    // return 0;
    // }
    // let y = this.law.version.vote_summary.yays == undefined ? 0 : this.law.version.vote_summary.yays;
    // let uy = this.law.version.vote_summary.upstream_yays == undefined ? 0 : this.law.version.vote_summary.upstream_yays;
    // return y + uy;
    // }

    goToAnchor(hash) {
        window.location.hash = hash;
        this.route.fragment.take(1).subscribe((fragment: string) => {
            const ele = document.getElementById(hash);
            if (ele) {
                ele.scrollIntoView();
            }
        });
    }
}
