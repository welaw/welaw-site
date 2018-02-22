import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
// material
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
// welaw
import { LawModule } from '../law/law.module';
import { LawItemModule } from '../law/item/item.module';
import { UserItemModule } from '../user/item/item.module';
import { UpstreamRoutingModule } from './upstream.routing';
import { UpstreamItemModule } from './item/item.module';
import { UpstreamService } from './upstream.service';
import { UpstreamStoreService } from './upstream-store.service';
import { UpstreamLawsComponent } from './laws/laws.component';
import { LawMakersComponent } from './lawmakers/lawmakers.component';
import { SharedModule } from '../shared/shared.module';
import { AdminModule } from '../admin/admin.module';
import { UpstreamComponent } from './upstream.component';
import { UpstreamInfoComponent } from './info/info.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        // welaw
        UpstreamRoutingModule,
        LawModule,
        LawItemModule,
        UserItemModule,
        UpstreamItemModule,
        SharedModule,
        AdminModule,
        // material
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
        MatPaginatorModule
    ],
    declarations: [
        UpstreamLawsComponent,
        LawMakersComponent,
        UpstreamComponent,
        UpstreamInfoComponent
    ],
    exports: [
        UpstreamLawsComponent,
        LawMakersComponent
    ]
})
export class UpstreamModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: UpstreamModule,
            providers: [
                UpstreamService,
                UpstreamStoreService
            ]
        }
    }
}
