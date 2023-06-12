import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CustomerService} from "../_services/customer.service";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";
import {Collector} from "../_models/collector.model";
import {CollectorService} from "../_services/collector.service";

@Component({
  selector: 'app-edit-collector',
  templateUrl: './edit-collector.component.html',
  styleUrls: ['./edit-collector.component.css']
})
export class EditCollectorComponent implements OnInit {

  editedCollector: Collector
  collectorForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<EditCollectorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private customerService: CustomerService,
              private dialog: MatDialog,
              private collectorService: CollectorService) {
    this.editedCollector = this.data.collector
  }

  ngOnInit(): void {
    this.collectorForm = new FormGroup({
      id: new FormControl({value: null, disabled: false}, Validators.required),
      name: new FormControl({value: null, disabled: false}, Validators.required),
      surname: new FormControl({value: null, disabled: false}, Validators.required),
      address: new FormControl({value: null, disabled: false}, Validators.required),
      phone: new FormControl({value: null, disabled: false}, Validators.required),
      ssn: new FormControl({value: null, disabled: false}, Validators.required),
    });

    this.setData()
  }
  private setData() {
    this.collectorForm.get('id')?.setValue(this.editedCollector.id);
    this.collectorForm.get('name')?.setValue(this.editedCollector.name);
    this.collectorForm.get('surname')?.setValue(this.editedCollector.surname);
    this.collectorForm.get('address')?.setValue(this.editedCollector.address);
    this.collectorForm.get('phone')?.setValue(this.editedCollector.phone);
    this.collectorForm.get('ssn')?.setValue(this.editedCollector.ssn);
  }

  onSubmit() {
    console.log(this.collectorForm.value)
    this.collectorService.validateSSNExist(this.collectorForm.get('id')!.value, this.collectorForm.get('ssn')!.value).subscribe(
      ssnValid => {
        console.log(ssnValid)
        if (!ssnValid) {
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '600px',
            data: {message: "Collector with this SSN is already in the base"}
          });
        } else {
          this.collectorService.update(this.collectorForm).subscribe(
            response => {
              this.dialogRef.close({event: 'Success'});
            }
          );

        }
      }
    );
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

}
