import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

    @Input() message: string;

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
    }

    getReturnUrl() {
        return encodeURIComponent(this.router.url);
    }

}
