import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserStoreService } from '../../user-store.service';

@Component({
    selector: 'app-user-biography',
    templateUrl: './biography.component.html',
    styleUrls: ['./biography.component.css']
})
export class BiographyComponent implements OnInit {

    currentBiography: string;
    newBiography: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userStoreService: UserStoreService,
        public dialogRef: MatDialogRef<BiographyComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.currentBiography = data.currentBiography;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
    }

    submit() {
    }
}
