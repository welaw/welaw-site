import { Component, OnInit, Input } from '@angular/core';
import { LawSet } from '../../law';

@Component({
    selector: 'app-law-item-author-desktop',
    templateUrl: './author-desktop.component.html',
    styleUrls: ['./author-desktop.component.css']
})
export class LawItemAuthorDesktopComponent implements OnInit {

    @Input() law: LawSet;

    constructor() { }

    ngOnInit() {
    }

    avatarUrlError(e) {
        if (this.law == null || this.law.author == null) {
            return;
        }
        this.law.author.picture_url = 'https://api.adorable.io/avatars/285/' + this.law.author.username;
    }
}
