import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
// Material
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
import { PublicRoutingModule } from './public.routing';
import { PrivacyComponent } from './privacy/privacy.component';
import { AboutComponent } from './about/about.component';
import { FrontComponent } from './front/front.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UpstreamItemModule } from '../upstream/item/item.module';
import { PublicStoreService } from './public-store.service';

@NgModule({
    imports: [
        CommonModule,
        // welaw
        PublicRoutingModule,
        UpstreamItemModule,
        // Material
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
        PrivacyComponent,
        AboutComponent,
        FrontComponent,
        NotFoundComponent
    ],
    exports: [
        PrivacyComponent,
        AboutComponent,
        FrontComponent,
        NotFoundComponent
    ]
})
export class PublicModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PublicModule,
            providers: [
                PublicStoreService
            ]
        }
    }
 }
