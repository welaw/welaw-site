import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
// Material
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
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
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
// welaw
import { LogInComponent } from './log-in/log-in.component';
import { FilterComponent } from './filter/filter.component';
import { FilterMobileComponent } from './filter-mobile/filter-mobile.component';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
import { LoggerService } from './logging/logger.service';
import { ConsoleLoggerService } from './logging/console-logger';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        FlexLayoutModule,
        // Material
        MatRadioModule,
        MatExpansionModule,
        MatButtonToggleModule,
        MatSlideToggleModule,
        MatAutocompleteModule,
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
        MatChipsModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule
    ],
    declarations: [
        LogInComponent,
        FilterComponent,
        FilterMobileComponent,
        ShareDialogComponent
    ],
    exports: [
        LogInComponent,
        FilterComponent,
        FilterMobileComponent
    ],
    entryComponents: [
        ShareDialogComponent
    ],
    providers: [
        MatDialog
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                { provide: LoggerService, useClass: ConsoleLoggerService }
            ]
        }
    }
 }
