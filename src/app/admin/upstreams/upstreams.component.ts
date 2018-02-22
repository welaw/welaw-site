import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Upstream } from '../../upstream/upstream';
import { AdminStoreService } from '../admin-store.service';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-upstreams',
    templateUrl: './upstreams.component.html',
    styleUrls: ['./upstreams.component.css']
})
export class UpstreamsComponent implements OnInit {

    upstreamsDataSource = new MatTableDataSource();
    displayedColumns = ['name', 'ident', 'body_name', 'body_email', 'body_url', 'geo_coords', 'created_at', 'deleted_at'];

    pageIndex = 0;

    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 100];

    // MatPaginator Output
    pageEvent: PageEvent | void;

    upstreams: Observable<Upstream[]>;
    upstreamsSub;

    constructor(
        private adminStoreService: AdminStoreService
    ) { }

    ngOnInit() {
        this.upstreams = this.adminStoreService.upstreams;
        this.upstreamsSub = this.upstreams.subscribe(upstreams => {
            if (upstreams == null) {
                return;
            }
            this.upstreamsDataSource.data = upstreams;
        });

        this.adminStoreService.loadUpstreams(null, 10, 1);
    }

    getServerData(e) {
    }
}
