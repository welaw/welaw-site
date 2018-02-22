import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LawStoreService } from '../law-store.service';
import { UpstreamStoreService } from '../../upstream/upstream-store.service';
import { DiffStoreService } from './diff-store.service';
import { Upstream } from '../../upstream/upstream';
import { LawSet } from '../law';
import 'rxjs/add/observable/combineLatest';
import { isMobile } from '../../shared/format';

@Component({
    selector: 'app-diff',
    templateUrl: './diff.component.html',
    styleUrls: ['./diff.component.css'],
    providers: [DiffStoreService]
})
export class DiffComponent implements OnInit, OnDestroy {

    upstream: Observable<Upstream>;
    law: Observable<LawSet>;
    theirs: Observable<LawSet>;
    branches: Observable<LawSet[]>;
    versions: Observable<LawSet[]>;
    diff: Observable<string>;

    lawSet: LawSet;
    versionCount;
    diffing: boolean;

    ourBranch: string;
    ourVersion: string;
    branch: string;
    version: string;

    viewBody: string;

    diffSub;
    lawSub;
    routeSub;
    theirsSub;
    worker;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private diffStoreService: DiffStoreService,
        private lawStoreService: LawStoreService,
        private upstreamStoreService: UpstreamStoreService
    ) { }

    ngOnInit() {
        this.upstream = this.upstreamStoreService.upstream;
        this.law = this.lawStoreService.law;
        this.diff = this.diffStoreService.diff;
        this.theirs = this.diffStoreService.theirs;
        this.branches = this.lawStoreService.branches;
        this.versions = this.diffStoreService.versions;

        this.routeSub = Observable.combineLatest(this.route.params, this.route.parent.params).subscribe(
            data => {
                const p = data[0];
                const pp = data[1];

                this.ourBranch = pp['branch'];
                this.ourVersion = pp['version'];
                this.branch = p['theirBranch'];
                this.version = p['theirVersion'];

                this.diffStoreService.loadBranchVersions(pp['upstream'], pp['ident'], p['theirBranch']);
                this.diffStoreService.loadDiff(
                    pp['upstream'],
                    pp['ident'],
                    pp['branch'],
                    pp['version'],
                    p['theirBranch'],
                    p['theirVersion']
                );
                this.diffing = true;
            });

        this.diffSub = this.diff.subscribe(diff => {
            if (diff == null || diff === '') {
                this.diffing = false;
                this.viewBody = '';
                return;
            }

            if (this.diffing && this.worker != null) {
                this.worker.terminate();
            }
            this.worker = new Worker('./assets/worker_diff.js');
            const comp = this;
            this.worker.addEventListener('message', function (e) {
                comp.diffing = false;
                comp.viewBody = e.data;
            });
            this.worker.postMessage(diff);

        });

        this.theirsSub = this.theirs.subscribe(law => {
            if (law == null) {
                return;
            }
            if (law.branch != null && law.version != null) {
                this.branch = law.branch.name;
                this.version = '' + law.version.version;
            }
        });
    }

    ngOnDestroy() {
        if (this.routeSub != null) {
            this.routeSub.unsubscribe();
        }
        if (this.diffSub != null) {
            this.diffSub.unsubscribe();
        }
        if (this.theirsSub != null) {
            this.theirsSub.unsubscribe();
        }
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
