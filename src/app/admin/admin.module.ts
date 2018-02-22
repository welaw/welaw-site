import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
// Material
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';
import { MatTextareaAutosize } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatChipsModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
// welaw
import { UpstreamsComponent } from './upstreams/upstreams.component';
import { AdminUpstreamComponent } from './upstream/upstream.component';
import { AdminUserComponent } from './user/user.component';
import { UserItemModule } from '../user/item/item.module';
import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin.component';
import { UsersAdminComponent } from './users/users.component';
import { UpstreamItemModule } from '../upstream/item/item.module';
import { AdminStoreService } from './admin-store.service';
import { SharedModule } from '../shared/shared.module';
import { PasswordComponent } from './user/password/password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminService } from './admin.service';
import { OperationsComponent } from './operations/operations.component';

@NgModule({
    imports: [
        CommonModule,
        UserItemModule,
        UpstreamItemModule,
        AdminRoutingModule,
        SharedModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        // Material
        MatTableModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatTooltipModule,
        MatListModule,
        MatCardModule,
        MatSelectModule,
        MatInputModule,
        MatIconModule,
        MatSidenavModule,
        MatMenuModule,
        MatButtonModule,
        MatTabsModule,
        MatGridListModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule
    ],
    declarations: [
        AdminComponent,
        UsersAdminComponent,
        UpstreamsComponent,
        AdminUpstreamComponent,
        AdminUserComponent,
        PasswordComponent,
        DashboardComponent,
        OperationsComponent
    ],
    providers: [
        AdminService,
        AdminStoreService
    ],
    exports: [
        AdminUpstreamComponent,
        AdminUserComponent
    ],
    entryComponents: [
        PasswordComponent
    ],
})
export class AdminModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AdminModule,
            providers: [
                AdminService,
                AdminStoreService
            ]
        }
    }
}
