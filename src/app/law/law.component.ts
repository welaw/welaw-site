import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LawStoreService } from './law-store.service';
import { UpstreamStoreService } from '../upstream/upstream-store.service';
import { Upstream } from '../upstream/upstream';
import { LawSet, LawTag, getDate } from './law';
import { Vote } from '../ballot/ballot';
import { isMobile } from '../shared/format';

@Component({
    selector: 'app-law',
    templateUrl: './law.component.html',
    styleUrls: ['./law.component.css']
})
export class LawComponent implements OnInit {

    upstream: Observable<Upstream>;
    law: Observable<LawSet>;
    branches: Observable<LawSet[]>;
    versions: Observable<LawSet[]>;
    vote: Observable<Vote>;

    lawValue: LawSet;
    branchesValue: LawSet[];

    branch: string;
    version: string;

    routeSub;
    lawSub;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private lawStoreService: LawStoreService,
        private upstreamStoreService: UpstreamStoreService
    ) { }

    ngOnInit() {
        this.upstream = this.upstreamStoreService.upstream;
        this.law = this.lawStoreService.law;
        this.branches = this.lawStoreService.branches;
        this.versions = this.lawStoreService.versions;
        this.vote = this.lawStoreService.vote;

        this.routeSub = this.route.params.subscribe(p => {
            this.upstreamStoreService.loadUpstream(p['upstream']);
            this.lawStoreService.loadLawVersion(p['upstream'], p['ident'], p['branch'], p['version']);
            this.lawStoreService.loadLawBranches(p['upstream'], p['ident']);
            this.lawStoreService.loadBranchVersions(p['upstream'], p['ident'], p['branch']);
            this.branch = p['branch'];
        });

        this.lawSub = this.law.subscribe(l => {
            if (l == null) {
                this.router.navigate(['/not-found']);
            }
        });
    }

    onBranchChanged(e) {
        this.router.navigate(['../../' + e + '/latest'], { relativeTo: this.route });
    }

    onVersionChanged(e) {
        this.router.navigate(['../' + e], { relativeTo: this.route });
    }

    isMobile() {
        return isMobile();
    }

}
