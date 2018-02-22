import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UpstreamStoreService } from './upstream-store.service';
import { Upstream } from './upstream';

@Component({
    selector: 'app-upstream',
    templateUrl: './upstream.component.html',
    styleUrls: ['./upstream.component.css']
})
export class UpstreamComponent implements OnInit, OnDestroy {

    upstream: Observable<Upstream>;
    routeSub;

    constructor(
        private route: ActivatedRoute,
        private upstreamStoreService: UpstreamStoreService
    ) { }

    ngOnInit() {
        this.upstream = this.upstreamStoreService.upstream;
        this.routeSub = this.route.params.subscribe((params: Params) => {
            const u = params['upstream'];
            this.upstreamStoreService.loadUpstream(u);
        });
    }

    ngOnDestroy() {
        if (this.routeSub != null) {
            this.routeSub.unsubscribe();
        }
    }

}
