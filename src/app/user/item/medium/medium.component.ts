import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../user';
import { avatarErrorURL } from '../../../shared/format';

@Component({
    selector: 'app-user-item-medium',
    templateUrl: './medium.component.html',
    styleUrls: ['./medium.component.css']
})
export class UserItemMediumComponent implements OnInit, OnChanges {

    @Input() user: User;
    @Input() owner: boolean;
    @Input() admin: boolean;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
    }

    ngOnChanges(c: SimpleChanges) {
        if (c.user == null || c.user.currentValue == null) {
            return;
        }
        if (c.user.currentValue.picture_url == null || c.user.currentValue.picture_url === '') {
            this.user.picture_url = avatarErrorURL(this.user.username);
        }
    }

    avatarUrlError(e) {
        if (this.user == null) {
            return;
        }
        this.user.picture_url = avatarErrorURL(this.user.username);
    }

}
