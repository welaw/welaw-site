import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LawStoreService } from '../../law-store.service';
import { LawSet, getDate } from '../../law';
import { Upstream } from '../../../upstream/upstream';
import { ShareDialogComponent } from '../../../shared/share-dialog/share-dialog.component';
import { avatarErrorURL } from '../../../shared/format';

@Component({
    selector: 'app-law-item-list-mobile',
    templateUrl: './list-mobile.component.html',
    styleUrls: ['./list-mobile.component.css']
})
export class LawItemListMobileComponent implements OnInit, OnChanges {

    noFlex: number;
    noColor: string;
    yesFlex: number;
    yesColor: string;

    branch: string;
    version: string;

    @Input() law: LawSet;
    @Input() full: boolean;
    @Input() upstream: Upstream;
    @Input() branches: LawSet[];
    @Input() versions: LawSet[];

    @Output() branchChange = new EventEmitter<string>();
    @Output() versionChange = new EventEmitter<string>();

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
        private dialog: MatDialog
    ) {
        this.d = new Date(1970, 0, 1);
    }

    ngOnInit() {
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
                this.noColor = '#F4511E';
            }
            if (y === 0) {
                this.yesColor = '#9E9E9E';
            } else {
                this.yesColor = '#4CAF50';
            }
            this.noFlex = Math.round(1 + 9 * (n / (y + n)));
            this.yesFlex = Math.round(1 + 9 * (y / (y + n)));
        }
    }

    hasVoted(): boolean {
        return false;
    }

    shareDialog() {
        const dialogRef = this.dialog.open(ShareDialogComponent, {
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    onBranchChanged(e) {
        this.branchChange.emit(e);
    }

    onVersionChanged(e) {
        this.versionChange.emit(e);
    }

    avatarUrlError(e) {
        if (this.law == null || this.law.author == null) {
            return;
        }
        this.law.author.picture_url = avatarErrorURL(this.law.author.username);
    }

}

