import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LawStoreService } from '../../law-store.service';
import { LawSet, LawTag, getDate } from '../../law';
import { Upstream } from '../../../upstream/upstream';
import { ShareDialogComponent } from '../../../shared/share-dialog/share-dialog.component';

@Component({
    selector: 'app-law-item-full-desktop',
    templateUrl: './full-desktop.component.html',
    styleUrls: ['./full-desktop.component.css']
})
export class LawItemFullDesktopComponent implements OnInit, OnChanges {

    @Input() upstream: Upstream;
    @Input() law: LawSet;
    @Input() branches: LawSet[];
    @Input() versions: LawSet[];
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

    constructor(
        private dialog: MatDialog
    ) {
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
        this.d = getDate(this.law);
    }

    ngOnChanges(c: SimpleChanges) {
        if (c.law == null || c.law.currentValue == null) {
            return;
        }
        const law = this.law;
        this.d = getDate(law);
        if (law.branch != null) {
            this.branch = law.branch.name;
        }
        if (law.version != null) {
            this.version = '' + law.version.version;
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

    shareDialog() {
        const dialogRef = this.dialog.open(ShareDialogComponent, {
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    avatarUrlError(e) {
        if (this.law == null || this.law.author == null) {
            return;
        }
        this.law.author.picture_url = 'https://api.adorable.io/avatars/285/' + this.law.author.username;
    }
}
