import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserStoreService } from '../../user-store.service';

@Component({
    selector: 'app-delete-user',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})
export class DeleteUserComponent implements OnInit {

    confirm: string;
    username: string;

    constructor(
        private userStoreService: UserStoreService,
        public dialogRef: MatDialogRef<DeleteUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.username = data.username;
    }

    ngOnInit() {
    }

    submit() {
        if (this.username !== this.confirm) {
            return;
        }
        this.userStoreService.deleteUser(this.username);
        this.dialogRef.close();
    }
}
