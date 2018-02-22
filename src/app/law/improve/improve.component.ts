import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LawSet, Version } from '../law';
import { User } from '../../user/user';
import { LawStoreService } from '../law-store.service';
import { AuthStoreService } from '../../auth/auth-store.service';
import { ImproveStoreService } from './improve-store.service';
import { Upstream } from '../../upstream/upstream';
import { UpstreamStoreService } from '../../upstream/upstream-store.service';

@Component({
    selector: 'app-improve-law',
    templateUrl: './improve.component.html',
    styleUrls: ['./improve.component.css'],
    providers: [ImproveStoreService]
})
export class ImproveComponent implements OnInit, OnDestroy {

    upstream: Observable<Upstream>;
    law: Observable<LawSet>;
    newLaw: Observable<LawSet>;
    myLaw: Observable<LawSet>;
    currentUser: Observable<User>;

    u: User;
    s: LawSet;
    edit: string;
    comment: string;

    editing: boolean;
    lawSub;
    myLawSub;
    currentUserSub;
    newLawSub;
    routeSub;

    improveCtrl: FormGroup;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authStoreService: AuthStoreService,
        private lawStoreService: LawStoreService,
        private upstreamStoreService: UpstreamStoreService,
        private improveStoreService: ImproveStoreService,
        private fb: FormBuilder
    ) {
        this.currentUser = authStoreService.user;
        this.law = this.lawStoreService.law;
        this.myLaw = this.lawStoreService.myLaw;
        this.newLaw = this.lawStoreService.newLaw;
        this.upstream = this.upstreamStoreService.upstream;

        this.improveCtrl = fb.group({
            hideRequired: false,
            floatLabel: 'auto',
            edit: '',
            comment: ''
        });
    }

    ngOnInit() {
        this.currentUserSub = this.currentUser.subscribe(u => { this.u = u; });
        this.lawSub = this.law.subscribe(s => {
            if (s == null) {
                return;
            }
            this.s = s;
            if (s.version == null) {
                return;
            }
            this.improveCtrl.patchValue({
                edit: s.version.body
            });
        });

        this.newLawSub = this.newLaw.subscribe(law => {
            this.router.navigate(['../../../' + law.branch.name], { relativeTo: this.route });
        });

        this.myLawSub = this.myLaw.subscribe(law => {
        });
    }

    ngOnDestroy() {
        this.currentUserSub.unsubscribe();
        this.lawSub.unsubscribe();
        this.newLawSub.unsubscribe();
    }

    signedIn() {
        return this.u != null;
    }

    submit() {
        // TODO
        if (this.u == null) {
            return;
        }
        const l = new LawSet();
        l.branch = Object.assign({}, this.s.branch);
        l.law = Object.assign({}, this.s.law);
        l.author = Object.assign({}, this.s.author);
        l.version = Object.assign({}, this.s.version);
        l.author.username = this.u.username;
        l.branch.name = this.u.username;
        l.version.body = this.improveCtrl.value.edit;
        l.version.comment = this.improveCtrl.value.comment;
        this.lawStoreService.createLawVersion(this.s.branch.name, this.s.version.version, l);
    }

    toggleEditing() {
        this.editing = !this.editing;
    }
}
