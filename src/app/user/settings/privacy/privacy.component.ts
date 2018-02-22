import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserStoreService } from '../../user-store.service';

@Component({
    selector: 'app-privacy-dialog',
    templateUrl: './privacy.component.html',
    styleUrls: ['./privacy.component.css']
})
export class PrivacyDialogComponent implements OnInit {

    toggleCtrl: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<PrivacyDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private userStoreService: UserStoreService
    ) {
        this.toggleCtrl = fb.group({
            emailPrivate: data.emailPrivate,
            fullNamePrivate: data.fullNamePrivate
        });
    }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    submit() {
        const user = this.userStoreService.getUser();
        let changeEmailPrivate = false;
        let changeFullNamePrivate = false;
        if (this.toggleCtrl.value.emailPrivate === user.email_private) {
            changeEmailPrivate = false;
        } else {
            changeEmailPrivate = true;
        }
        if (this.toggleCtrl.value.fullNamePrivate === user.full_name_private) {
            changeFullNamePrivate = false;
        } else {
            changeFullNamePrivate = true;
        }
        this.userStoreService.updatePrivacySettings(user.username, changeEmailPrivate, changeFullNamePrivate);
        this.dialogRef.close();
    }
}
