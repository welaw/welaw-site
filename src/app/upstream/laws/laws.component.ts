import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PageEvent } from '@angular/material';
import { Law, LawSet, LawTag } from '../../law/law';
import { UpstreamStoreService } from '../upstream-store.service';
import { Upstream } from '../upstream';
import { isMobile } from '../../shared/format';

@Component({
    selector: 'app-upstream-laws',
    templateUrl: './laws.component.html',
    styleUrls: ['./laws.component.css']
})
export class UpstreamLawsComponent implements OnInit {

    upstream: Observable<Upstream>;
    tags: Observable<LawTag[]>;
    ident: string;
    laws: Observable<LawSet[]>;
    count: Observable<number>;

    arrow: string;
    pageIndex = 0;
    options;

    desc = true;
    orderBy = 'published_at';
    search: string;
    filterOpts: string[] = ['Date', 'Title', 'Author'];

    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 100];

    // MatPaginator Output
    pageEvent: PageEvent | void;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private upstreamStoreService: UpstreamStoreService
    ) {
        this.arrow = 'keyboard_arrow_down';
    }

    ngOnInit() {
        this.upstream = this.upstreamStoreService.upstream;
        this.laws = this.upstreamStoreService.laws;
        this.count = this.upstreamStoreService.lawsCount;
        this.tags = this.upstreamStoreService.tags;

        this.options = [
            'test'
        ];

        this.count.subscribe(r => {
            this.length = r;
        });

        this.upstream.subscribe(r => {
            if (r == null) {
                return;
            }
            this.ident = r.ident;
        });

        this.route.parent.params.subscribe((params: Params) => {
            const u = params['upstream'];
            this.upstreamStoreService.loadUpstream(u);
            // this.upstreamStoreService.loadUpstreamTags(u);
            this.upstreamStoreService.loadUpstreamLaws(u, this.pageSize, this.pageIndex, this.desc, this.orderBy, '');
        });

    }

    getServerData(event) {
        this.upstreamStoreService.loadUpstreamLaws(this.ident, event.pageSize, event.pageIndex, this.desc, this.orderBy, '');
    }

    onVersionChanged(event) {
    }

    onFilterChanged(event) {
        this.orderBy = event.selectedOpt;
        this.desc = event.desc;
        this.search = event.search;
        this.upstreamStoreService.loadUpstreamLaws(this.ident, this.pageSize, this.pageIndex, event.desc, event.selectedOpt, event.search);
    }

    isMobile() {
        return isMobile();
    }
}

