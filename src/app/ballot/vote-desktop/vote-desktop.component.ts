import { Component, OnInit, Input } from '@angular/core';
import { Vote } from '../ballot';

@Component({
    selector: 'app-vote-desktop',
    templateUrl: './vote-desktop.component.html',
    styleUrls: ['./vote-desktop.component.css']
})
export class VoteDesktopComponent implements OnInit {

    @Input() vote: Vote;

    constructor() { }

    ngOnInit() {
    }

}
