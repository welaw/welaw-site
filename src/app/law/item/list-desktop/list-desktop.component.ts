import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UpstreamStoreService } from '../../../upstream/upstream-store.service';
import { LawStoreService } from '../../law-store.service';
import { LawSet, LawTag, getDate } from '../../law';
import { Upstream } from '../../../upstream/upstream';

@Component({
    selector: 'app-law-item-list-desktop',
    templateUrl: './list-desktop.component.html',
    styleUrls: ['./list-desktop.component.css']
})
export class LawItemListDesktopComponent implements OnInit, OnChanges {

    @Input() upstream: Upstream;
    @Input() law: LawSet;
    @Input() branches: LawSet[];
    @Input() versions: LawSet[];

    // TODO
    @Input() ourVersions: LawSet[];

    noFlex: number;
    yesFlex: number;
    ourBranch: string;
    ourVersion: string;
    routeSub;
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

    ngOnInit() {
        this.d = getDate(this.law);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.law == null) {
            return;
        }
        const c = <LawSet>changes.law.currentValue;
        if (c == null || c.version == null) {
            return;
        }

        this.ourVersion = '' + c.version.version;
        const y = c.version.yays;
        const n = c.version.nays;
        this.noFlex = Math.round(10 * (n / (y + n)));
        this.yesFlex = Math.round(10 * (y / (y + n)));
        this.d = getDate(c);
    }

    hasVoted(): boolean {
        return false;
    }

    // isOverflown(element) {
    // return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    // }

}
