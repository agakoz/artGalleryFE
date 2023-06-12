import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-approval-dialog',
  templateUrl: './approval-dialog.component.html',
  styleUrls: ['./approval-dialog.component.scss']
})
export class ApprovalDialogComponent implements OnInit {

  private dialogRef: MatDialogRef<ApprovalDialogComponent>;

  constructor(
    dialogRef: MatDialogRef<ApprovalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.dialogRef = dialogRef;
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {

  }

  approve() {
    this.dialogRef.close({event: 'Approved'});
  }

  cancel() {
    this.dialogRef.close({event: 'Canceled'});
  }
}
