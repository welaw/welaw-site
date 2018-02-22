import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { UpstreamStoreService } from '../../upstream/upstream-store.service';
import { Upstream } from '../../upstream/upstream';
import { LawTag } from '../../law/law';

@Component({
    selector: 'app-admin-upstream',
    templateUrl: './upstream.component.html',
    styleUrls: ['./upstream.component.css']
})
export class AdminUpstreamComponent implements OnInit, OnDestroy {

    tags: Observable<LawTag[]>;
    tagsSub;
    upstream: Observable<Upstream>;
    upstreamCtrl: FormGroup;
    upstreamSub;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private upstreamStoreService: UpstreamStoreService
    ) {
        this.upstreamCtrl = fb.group({
            ident: '',
            upstream_name: '',
            upstream_description: '',
            name: '',
            description: '',
            url: '',
            default_user: '',
            geo_coords: '',
            metadata: {},
            tags: []
        });
    }

    ngOnInit() {
        this.upstream = this.upstreamStoreService.upstream;
        this.tags = this.upstreamStoreService.tags;

        this.upstreamSub = this.upstream.subscribe(u => {
            this.setUpstream(u);
        });

        this.tagsSub = this.tags.subscribe(t => {
            this.setTags(t);
        });

        this.route.parent.params.subscribe((params: Params) => {
            this.upstreamStoreService.loadUpstream(params['upstream']);
        });
    }

    ngOnDestroy() {
        this.upstreamSub.unsubscribe();
    }

    getUpstream() {
        const u = <Upstream>({
            name: this.upstreamCtrl.value.name,
            ident: this.upstreamCtrl.value.ident,
            description: this.upstreamCtrl.value.description
        });
        return u;
    }

    setTags(t) {
        if (t == null) {
            return;
        }
        this.upstreamCtrl.patchValue({
            tags: t
        });
    }

    setUpstream(u: Upstream) {
        if (u == null) {
            return;
        }
        this.upstreamCtrl.patchValue({
            upstream_name: u.upstream_name,
            ident: u.ident,
            upstream_description: u.upstream_description,
            name: u.name,
            description: u.description,
            url: u.url,
            default_user: u.default_user,
            geo_coords: u.geo_coords,
            metadata: u.metadata
        });
    }

    submit() {
    }
}
