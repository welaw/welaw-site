import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyComponent } from './privacy/privacy.component';
import { AboutComponent } from './about/about.component';
import { FrontComponent } from './front/front.component';
import { NotFoundComponent } from './not-found/not-found.component';

const publicRoutes: Routes = [
    { path: '', component: FrontComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'about', component: AboutComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(publicRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})

export class PublicRoutingModule { }
