import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserLawsComponent } from './laws/laws.component';
import { UserProfileComponent } from './profile/profile.component';
import { UserVotesComponent } from './votes/votes.component';
import { UserSettingsComponent } from './settings/settings.component';
import { AdminUserComponent } from '../admin/user/user.component';
import { AuthGuard } from '../auth/auth.guard';

const userRoutes: Routes = [
    {
        path: ':user', component: UserComponent, children: [
            { path: '', component: UserLawsComponent },
            { path: 'profile', component: UserProfileComponent },
            { path: 'settings', component: UserSettingsComponent, canActivate: [AuthGuard] },
            { path: 'votes', component: UserVotesComponent },
            { path: 'admin', component: AdminUserComponent, canActivate: [AuthGuard] },
        ]
    },
    { path: '**', redirectTo: '/not-found' }
]

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})

export class UserRoutingModule { }
