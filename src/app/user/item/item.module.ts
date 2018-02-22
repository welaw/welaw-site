import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
import { UserItemMediumComponent } from './medium/medium.component';
import { UserItemSmallComponent } from './small/small.component';
import { UserItemBaseDesktopComponent } from './base-desktop/base-desktop.component';
import { UserItemVoteDesktopComponent } from './vote-desktop/vote-desktop.component';
import { DefaultListComponent } from './default-list/default-list.component';
import { BallotModule } from '../../ballot/ballot.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        // welaw
        BallotModule,
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
        UserItemMediumComponent,
        UserItemSmallComponent,
        UserItemBaseDesktopComponent,
        UserItemVoteDesktopComponent,
        DefaultListComponent
    ],
    exports: [
        UserItemMediumComponent,
        UserItemSmallComponent,
        UserItemVoteDesktopComponent
    ]
})
export class UserItemModule { }
