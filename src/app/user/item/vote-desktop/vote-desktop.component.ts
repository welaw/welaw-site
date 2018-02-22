import { Component, OnInit, Input } from '@angular/core';
import { Vote } from '../../../ballot/ballot';
import { User } from '../../user';

@Component({
    selector: 'app-user-item-vote-desktop',
    templateUrl: './vote-desktop.component.html',
    styleUrls: ['./vote-desktop.component.css']
})
export class UserItemVoteDesktopComponent implements OnInit {

    @Input() vote: Vote;

    constructor() { }

    ngOnInit() {
    }

}
