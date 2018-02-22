import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
// Material
import { MatToolbarModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
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
import { MatAutocompleteModule } from '@angular/material';
// welaw
import { UserRoutingModule } from './user.routing';
import { UserItemModule } from './item/item.module';
import { AdminModule } from '../admin/admin.module';
import { BallotModule } from '../ballot/ballot.module';
import { LawItemModule } from '../law/item/item.module';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './user.service';
import { UserStoreService } from './user-store.service';
import { UserLawsComponent } from './laws/laws.component';
import { UserVotesComponent } from './votes/votes.component';
import { UserSettingsComponent } from './settings/settings.component';
import { UserComponent } from './user.component';
import { ChangeUsernameComponent } from './settings/change-username/change-username.component';
import { UserProfileComponent } from './profile/profile.component';
import { DeleteUserComponent } from './settings/delete/delete.component';
import { PrivacyDialogComponent } from './settings/privacy/privacy.component';
import { BiographyComponent } from './settings/biography/biography.component';
import { ChangeFullNameComponent } from './settings/change-full-name/change-full-name.component';

@NgModule({
    imports: [
        CommonModule,
        LawItemModule,
        FormsModule,
        ReactiveFormsModule,
        UserItemModule,
        BallotModule,
        UserRoutingModule,
        FlexLayoutModule,
        SharedModule,
        AdminModule,
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
        MatAutocompleteModule,
        MatFormFieldModule
    ],
    declarations: [
        DeleteUserComponent,
        UserLawsComponent,
        UserVotesComponent,
        UserSettingsComponent,
        UserComponent,
        ChangeUsernameComponent,
        UserProfileComponent,
        PrivacyDialogComponent,
        BiographyComponent,
        ChangeFullNameComponent
    ],
    providers: [],
    entryComponents: [
        ChangeUsernameComponent,
        DeleteUserComponent,
        PrivacyDialogComponent
    ],
    exports: [
        UserLawsComponent,
        UserVotesComponent,
        UserSettingsComponent
    ]
})
export class UserModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: UserModule,
            providers: [
                UserService,
                UserStoreService
            ]
        }
    }
}
