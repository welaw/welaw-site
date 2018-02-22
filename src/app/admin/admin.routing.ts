import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersAdminComponent } from './users/users.component';
import { AuthGuard } from '../auth/auth.guard';
import { UpstreamsComponent } from './upstreams/upstreams.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OperationsComponent } from './operations/operations.component';

const adminRoutes: Routes = [
    {
        path: '', component: AdminComponent, pathMatch: 'prefix', canActivate: [AuthGuard], children: [
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'operations', component: OperationsComponent },
            { path: 'users', component: UsersAdminComponent },
            { path: 'upstreams', component: UpstreamsComponent }
        ],
    },
    { path: '**', redirectTo: '/not-found' }
]

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})

export class AdminRoutingModule { }
