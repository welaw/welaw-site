import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LawComponent } from './law.component';
import { LawPageComponent } from './page/page.component';
import { DiffComponent } from './diff/diff.component';
import { VotesComponent } from './votes/votes.component';
import { VoteComponent } from './vote/vote.component';
import { ImproveComponent } from './improve/improve.component';
import { NotFoundComponent } from 'app/public/not-found/not-found.component';

const lawRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'master/latest' },
    { path: 'not-found', pathMatch: 'full', redirectTo: '/not-found' },
    {
        path: ':branch/:version',
        component: LawComponent,
        children: [
            { path: '', component: LawPageComponent },
            // { path: 'comments', component: LawCommentsComponent },
            // { path: 'comments/:pageSize', component: LawCommentsComponent },
            // { path: 'comments/:pageSize/:pageIndex', component: LawCommentsComponent },
            { path: 'improve', component: ImproveComponent },
            { path: 'vote', component: VoteComponent },
            { path: 'vote/list', component: VotesComponent },
            { path: 'diff', redirectTo: 'diff/master/latest' },
            { path: 'diff/:theirBranch/:theirVersion', component: DiffComponent }
        ]
    },
    { path: ':branch', redirectTo: ':branch/latest' },
    { path: '**', redirectTo: 'master' }
]

@NgModule({
    imports: [
        RouterModule.forChild(lawRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})

export class LawRoutingModule { }
