import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../user';
import { avatarErrorURL } from '../../../shared/format';

@Component({
    selector: 'app-user-item-small',
    templateUrl: './small.component.html',
    styleUrls: ['./small.component.css']
})
export class UserItemSmallComponent implements OnInit {

    @Input() user: User;

    constructor() { }

    ngOnInit() {
    }

    avatarUrlError(e) {
        if (this.user == null) {
            return;
        }
        this.user.picture_url = avatarErrorURL(this.user.username);
    }

}
