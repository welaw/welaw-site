import { Component, OnInit, Input } from '@angular/core';
import { Vote } from '../../../ballot/ballot';

@Component({
    selector: 'app-law-item-vote',
    templateUrl: './vote.component.html',
    styleUrls: ['./vote.component.css']
})
export class LawItemVoteComponent implements OnInit {

    @Input() vote: Vote;

    constructor() { }

    ngOnInit() {
    }

}
