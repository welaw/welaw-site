import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../user';
import { avatarErrorURL } from '../../../shared/format';

@Component({
    selector: 'app-user-item-base-desktop',
    templateUrl: './base-desktop.component.html',
    styleUrls: ['./base-desktop.component.css']
})
export class UserItemBaseDesktopComponent implements OnInit {

    owner: boolean;
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
