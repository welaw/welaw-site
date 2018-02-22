import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { MatDialogModule } from '@angular/material/dialog';
// welaw
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PublicModule } from './public/public.module';
import { AuthModule } from './auth/auth.module';
import { BallotModule } from './ballot/ballot.module';
import { LawModule } from './law/law.module';
import { UpstreamModule } from './upstream/upstream.module';
import { UserModule } from './user/user.module';

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent
    ],
    imports: [
        BrowserModule,
        FlexLayoutModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        // welaw
        AppRoutingModule,
        AuthModule.forRoot(),
        BallotModule.forRoot(),
        LawModule.forRoot(),
        UpstreamModule.forRoot(),
        UserModule.forRoot(),
        PublicModule.forRoot(),
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
        MatPaginatorModule,
        MatDialogModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
