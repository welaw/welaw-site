import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
// Material
import { MatButtonToggleModule } from '@angular/material/button-toggle';
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
import { SharedModule } from '../shared/shared.module';
import { LawRoutingModule } from './law.routing';
import { LawItemModule } from './item/item.module';
import { BallotModule } from '../ballot/ballot.module';
import { LawService } from './law.service';
import { LawStoreService } from './law-store.service';
import { LawPageComponent } from './page/page.component';
import { ImproveComponent } from './improve/improve.component';
import { VoteComponent } from './vote/vote.component';
import { DiffComponent } from './diff/diff.component';
import { VotesComponent } from './votes/votes.component';
import { UserItemModule } from '../user/item/item.module';
import { UpstreamItemModule } from '../upstream/item/item.module';
import { LawComponent } from './law.component';
import { CommentsComponent } from './page/comments/comments.component';
import { CommentService } from './comment.service';
import { CommentStoreService } from './page/comment-store.service';
import { ConsoleLoggerService } from 'app/shared/logging/console-logger';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        // welaw
        LawRoutingModule,
        UpstreamItemModule,
        UserItemModule,
        SharedModule.forRoot(),
        LawItemModule,
        BallotModule.forRoot(),
        // material
        MatButtonToggleModule,
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
        LawPageComponent,
        ImproveComponent,
        VoteComponent,
        VotesComponent,
        DiffComponent,
        LawComponent,
        CommentsComponent
    ],
    exports: [
        LawPageComponent,
        LawRoutingModule,
        ImproveComponent,
        VoteComponent,
        VotesComponent,
        DiffComponent
    ]
})
export class LawModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: LawModule,
            providers: [
                LawService,
                LawStoreService,
                CommentService,
                CommentStoreService,
                ConsoleLoggerService
            ]
        }
    }
}
