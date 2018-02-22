import { Component, OnInit, Input } from '@angular/core';
import { AuthStoreService } from '../../../auth/auth-store.service';
import { Upstream } from '../../upstream';
import { isMobile } from '../../../shared/format';

@Component({
    selector: 'app-upstream-item-medium',
    templateUrl: './medium.component.html',
    styleUrls: ['./medium.component.css']
})
export class UpstreamItemMediumComponent implements OnInit {

    @Input() upstream: Upstream;

    constructor(
        private authStoreService: AuthStoreService
    ) { }

    ngOnInit() { }

    isAdmin() {
        return this.authStoreService.isAdmin();
    }

    isMobile() {
        return isMobile();
    }

}
