import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpstreamComponent } from './upstream.component';
import { UpstreamInfoComponent } from './info/info.component';
import { UpstreamLawsComponent } from './laws/laws.component';
import { LawMakersComponent } from './lawmakers/lawmakers.component';
import { AdminUpstreamComponent } from '../admin/upstream/upstream.component';

const upstreamRoutes: Routes = [
    {
        path: '', component: UpstreamComponent, children: [
            { path: '', pathMatch: 'full', redirectTo: 'laws' },
            { path: 'info', component: UpstreamInfoComponent },
            { path: 'settings', component: AdminUpstreamComponent },
            { path: 'lawmakers', component: LawMakersComponent },
            { path: 'lawmakers/:pageSize/:pageIndex', component: UpstreamLawsComponent },
            { path: 'lawmakers/:pageSize/:pageIndex/:query', component: UpstreamLawsComponent },
            { path: 'laws', component: UpstreamLawsComponent },
            { path: 'laws/:pageSize/:pageIndex', component: UpstreamLawsComponent },
            { path: 'laws/:pageSize/:pageIndex/:query', component: UpstreamLawsComponent }
        ]
    },
    { path: ':ident', loadChildren: 'app/law/law.module#LawModule' },
    { path: '**', redirectTo: '/not-found' }
]

@NgModule({
    imports: [
        RouterModule.forChild(upstreamRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})

export class UpstreamRoutingModule { }
