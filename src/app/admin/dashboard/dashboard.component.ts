import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdminStoreService } from '../admin-store.service';
import { ServerStats } from '../admin';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

    stats: Observable<ServerStats>;
    statsSub;
    statsArray = [];

    items = ['Upstreams', 'Laws', 'Branches', 'Versions', 'Votes', 'Users'];
    iconMap = {
        upstreams: 'cloud_download',
        laws: 'chrome_reader_mode',
        branches: 'call_split',
        versions: 'toc',
        votes: 'assignment_turned_in',
        users: 'group'
    };

    constructor(
        private adminStoreService: AdminStoreService
    ) { }

    ngOnInit() {
        this.stats = this.adminStoreService.stats;
        this.statsSub = this.stats.subscribe(s => {
            if (s == null) {
                return;
            }
            this.statsArray = Object.keys(s).map((key) => { return { name: key, value: s[key] } });
        });

        this.adminStoreService.loadServerStats();
    }

    ngOnDestroy() {
        this.statsSub.unsubscribe();
    }

}
