import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PageEvent } from '@angular/material';
import { UpstreamStoreService } from '../upstream-store.service';
import { User } from '../../user/user';
import { Upstream } from '../upstream';

@Component({
    selector: 'app-lawmakers',
    templateUrl: './lawmakers.component.html',
    styleUrls: ['./lawmakers.component.css']
})
export class LawMakersComponent implements OnInit, OnDestroy {

    lawMakers: Observable<User[]>;
    lawMakersTotal: Observable<number>;
    upstream: Observable<Upstream>;
    upstreamSub;
    upstreamValue: Upstream;

    pageIndex = 0;

    filterOpts: string[] = ['Full Name', 'Username'];
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 100];

    // MatPaginator Output
    pageEvent: PageEvent | any;

    constructor(
        private route: ActivatedRoute,
        private upstreamStoreService: UpstreamStoreService
    ) { }

    ngOnInit() {
        this.lawMakers = this.upstreamStoreService.users;
        this.upstream = this.upstreamStoreService.upstream;
        this.lawMakersTotal = this.upstreamStoreService.usersTotal;

        this.lawMakersTotal.subscribe(r => {
            this.length = r;
        });

        this.route.parent.params.subscribe((params: Params) => {
            this.upstreamStoreService.loadUpstream(params['upstream']);
            this.upstreamStoreService.loadLawMakers(params['upstream'], this.pageSize, this.pageIndex);
        });

        this.upstreamSub = this.upstream.subscribe(u => { this.upstreamValue = u; });
    }

    ngOnDestroy() {
        this.upstreamSub.unsubscribe();
    }

    getServerData(event) {
        this.upstreamStoreService.loadLawMakers(this.upstreamValue.ident, event.pageSize, event.pageIndex);
    }

    getWidth() {
        return window.screen.width;
    }

    onFilterChanged(e) {
    }

}
