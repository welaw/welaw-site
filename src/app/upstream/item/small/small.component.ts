import { Component, OnInit, Input } from '@angular/core';
import { Upstream } from '../../upstream';

@Component({
    selector: 'app-upstream-item-small',
    templateUrl: './small.component.html',
    styleUrls: ['./small.component.css']
})
export class UpstreamItemSmallComponent implements OnInit {

    @Input() upstream: Upstream;

    constructor() { }

    ngOnInit() {
    }

}
