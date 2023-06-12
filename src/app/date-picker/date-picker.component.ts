import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SalespersonService} from "../_services/salesperson.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  dateForm: FormGroup;
  today: any;

  constructor(public dialogRef: MatDialogRef<DatePickerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private salespersonService: SalespersonService,
              private dialog: MatDialog,
              private datePipe : DatePipe) {
  }

  ngOnInit(): void {
    this.dateForm = new FormGroup({
      beginDate: new FormControl({value: null, disabled: false}, Validators.required),
      endDate: new FormControl({value: null, disabled: false}, Validators.required),
    })
    this.today = new Date();

  }

  approve() {
    this.dateForm.get('beginDate')?.setValue(this.datePipe.transform(this.dateForm.get('beginDate')?.value, 'yyyy-MM-dd'));
    this.dateForm.get('endDate')?.setValue(this.datePipe.transform(this.dateForm.get('endDate')?.value, 'yyyy-MM-dd'));

    this.dialogRef.close({event: 'Continue', dateRange: this.dateForm});
  }

  cancel() {
    this.dialogRef.close({event: 'Canceled'});
  }

}
