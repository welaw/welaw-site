import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Upstream } from '../../upstream/upstream';
import { PublicStoreService } from '../public-store.service';

@Component({
    selector: 'app-front',
    templateUrl: './front.component.html',
    styleUrls: ['./front.component.css']
})
export class FrontComponent implements OnInit {

    upstreams: Observable<Upstream[]>;

    constructor(
        private publicStoreService: PublicStoreService
    ) { }

    ngOnInit() {
        this.upstreams = this.publicStoreService.upstreams;

        this.publicStoreService.loadUpstreams();
    }

}
