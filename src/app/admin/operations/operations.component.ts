import { Component, OnInit } from '@angular/core';
import { AdminStoreService } from '../admin-store.service';

@Component({
    selector: 'app-operations',
    templateUrl: './operations.component.html',
    styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {

    constructor(
        private adminStoreService: AdminStoreService
    ) { }

    ngOnInit(
    ) {
    }

    saveRepos() {
        this.adminStoreService.saveRepos();
    }

    loadRepos() {
        this.adminStoreService.loadRepos();
    }
}
