import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
// Material
import { MatProgressBarModule } from '@angular/material/progress-bar';
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
import { LawItemFullMobileComponent } from './full-mobile/full-mobile.component';
import { LawItemMinMobileComponent } from './min-mobile/min-mobile.component';
import { LawItemBodyDesktopComponent } from './body-desktop/body-desktop.component';
import { LawItemListDesktopComponent } from './list-desktop/list-desktop.component';
import { LawItemAuthorDesktopComponent } from './author-desktop/author-desktop.component';
import { LawItemFullDesktopComponent } from './full-desktop/full-desktop.component';
import { LawItemMinDesktopComponent } from './min-desktop/min-desktop.component';
import { LawItemDiffDesktopComponent } from './diff-desktop/diff-desktop.component';
import { LawItemBodyMobileComponent } from './body-mobile/body-mobile.component';
import { LawItemVoteComponent } from './vote/vote.component';
import { CommentComponent } from './comment/comment.component';
import { BallotModule } from '../../ballot/ballot.module';
import { LawItemListMobileComponent } from './list-mobile/list-mobile.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FlexLayoutModule,
        // welaw
        BallotModule,
        // Material
        MatProgressBarModule,
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
        LawItemFullMobileComponent,
        LawItemMinMobileComponent,
        LawItemBodyDesktopComponent,
        LawItemListDesktopComponent,
        LawItemAuthorDesktopComponent,
        LawItemFullDesktopComponent,
        LawItemMinDesktopComponent,
        LawItemDiffDesktopComponent,
        LawItemBodyMobileComponent,
        LawItemVoteComponent,
        LawItemListMobileComponent,
        CommentComponent
    ],
    exports: [
        LawItemListDesktopComponent,
        LawItemFullMobileComponent,
        LawItemMinMobileComponent,
        LawItemFullDesktopComponent,
        LawItemMinDesktopComponent,
        LawItemDiffDesktopComponent,
        LawItemVoteComponent,
        LawItemListMobileComponent,
        CommentComponent
    ]
})
export class LawItemModule { }
