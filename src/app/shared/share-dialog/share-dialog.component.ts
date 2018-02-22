import { Component, OnInit, Inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-share-dialog',
    templateUrl: './share-dialog.component.html',
    styleUrls: ['./share-dialog.component.css']
})
export class ShareDialogComponent implements OnInit, AfterViewInit {

    @ViewChild('twitter') twitter: ElementRef;

    constructor(
        public dialogRef: MatDialogRef<ShareDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://platform.twitter.com/widgets.js';
            script.async = true;
            script.charset = 'utf-8';
            this.twitter.nativeElement.appendChild(script);
        }, 100);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
