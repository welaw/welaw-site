import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LawStoreService } from '../../law-store.service';
import { LawSet, LawTag, getDate } from '../../law';

@Component({
    selector: 'app-law-item-min-desktop',
    templateUrl: './min-desktop.component.html',
    styleUrls: ['./min-desktop.component.css']
})
export class LawItemMinDesktopComponent implements OnInit, OnChanges {

    @Input() law: LawSet;
    @Input() branches: LawSet[];
    @Input() versions: LawSet[];
    @Input() tags: LawTag[] = [];
    @Input() selects: boolean;
    @Input() buttons: boolean;
    @Output() branchChange = new EventEmitter<string>();
    @Output() versionChange = new EventEmitter<string>();

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

    constructor() {
        this.d = new Date(1970, 0, 1);
    }

    ngOnInit() {
        if (this.law == null) {
            return;
        }
        if (this.law.branch != null) {
            this.branch = this.law.branch.name;
        }
        if (this.law.version != null) {
            this.version = '' + this.law.version.version;
        }
        this.convertDate(this.law);
    }

    ngOnChanges(c: SimpleChanges) {
        if (c.law == null || c.law.currentValue == null) {
            return;
        }
        this.convertDate(c.law.currentValue);
        if (c.law.currentValue.branch != null) {
            this.branch = c.law.currentValue.branch.name;
        }
        if (c.law.currentValue.version != null) {
            this.version = '' + c.law.currentValue.version.version;
        }
    }

    hasVoted(): boolean {
        return false;
    }

    onBranchChanged(e) {
        this.branchChange.emit(e);
    }

    onVersionChanged(e) {
        this.versionChange.emit(e);
    }

    convertDate(law) {
        if (law == null || law.version == null) {
            return;
        }
        if (law.version.published_at == null || law.version.published_at.seconds == null) {
            return;
        }
        const t = new Date(1970, 0, 1);
        t.setSeconds(law.version.published_at.seconds);
        this.d = t;
    }
}
