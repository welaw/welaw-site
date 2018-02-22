import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { SignedInComponent } from './auth/signedin/signedin.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { UpstreamModule } from './upstream/upstream.module';
import { PublicModule } from './public/public.module';

export const appRoutes: Routes = [
    { path: '', loadChildren: 'app/public/public.module#PublicModule' },
    { path: 'about', loadChildren: 'app/public/public.module#PublicModule' },
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
    { path: 'not-found', loadChildren: 'app/public/public.module#PublicModule' },
    { path: 'privacy', loadChildren: 'app/public/public.module#PublicModule' },
    { path: 'register', component: RegisterComponent },
    { path: 'signed-in', component: SignedInComponent },
    { path: 'u', loadChildren: 'app/user/user.module#UserModule' },
    { path: ':upstream', loadChildren: 'app/upstream/upstream.module#UpstreamModule' },
    // { path: ':upstream', loadChildren: () => UpstreamModule },
    { path: '**', redirectTo: '/not-found' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})

export class AppRoutingModule { }
