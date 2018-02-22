import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UpstreamStoreService } from '../upstream-store.service';
import { Upstream } from '../upstream';

@Component({
    selector: 'app-upstream-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})
export class UpstreamInfoComponent implements OnInit {

    upstream: Observable<Upstream>;

    constructor(
        private upstreamStoreService: UpstreamStoreService
    ) { }

    ngOnInit() {
        this.upstream = this.upstreamStoreService.upstream;
    }

}
