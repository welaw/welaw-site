import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserStoreService } from '../../user-store.service';

@Component({
    selector: 'app-change-username',
    templateUrl: './change-username.component.html',
    styleUrls: ['./change-username.component.css']
})
export class ChangeUsernameComponent implements OnInit {

    currentUsername: string;
    newUsername: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userStoreService: UserStoreService,
        public dialogRef: MatDialogRef<ChangeUsernameComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.currentUsername = data.currentUsername;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
    }

    submit() {
        this.userStoreService.updateUsername(this.currentUsername, this.newUsername);
        this.dialogRef.close();
        this.router.navigate(['u/' + this.newUsername], { relativeTo: this.route });
    }

}
