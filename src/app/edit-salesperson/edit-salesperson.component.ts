import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SalespersonService} from "../_services/salesperson.service";
import {Sale} from "../_models/sale.model";
import {Salesperson} from "../_models/salesperson.model";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";

@Component({
  selector: 'app-edit-salesperson',
  templateUrl: './edit-salesperson.component.html',
  styleUrls: ['./edit-salesperson.component.css']
})
export class EditSalespersonComponent implements OnInit {

  salespersonForm: FormGroup;
  editSalesperson: Salesperson

  constructor(public dialogRef: MatDialogRef<EditSalespersonComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private salespersonService: SalespersonService,
              private dialog: MatDialog,) {
    // dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.salespersonForm = new FormGroup({
      id: new FormControl({value: null, disabled: false}, Validators.required),
      name: new FormControl({value: null, disabled: false}, Validators.required),
      surname: new FormControl({value: null, disabled: false}, Validators.required),
      ssn: new FormControl({value: null, disabled: false}, Validators.required),
    });
    this.editSalesperson =this.data.salesperson
    console.log(this.editSalesperson)
    this.setSalespersonData()
  }

  private setSalespersonData() {
    this.salespersonForm.get('id')?.setValue(this.editSalesperson.id);
    this.salespersonForm.get('name')?.setValue(this.editSalesperson.name);
    this.salespersonForm.get('surname')?.setValue(this.editSalesperson.surname);
    this.salespersonForm.get('ssn')?.setValue(this.editSalesperson.ssn);
  }
  onSubmit() {
    console.log(this.salespersonForm.value)
    this.salespersonService.validateSalespersonSSNExist(this.salespersonForm.get('id')!.value, this.salespersonForm.get('ssn')!.value).subscribe(
      ssnValid => {
        console.log(ssnValid)
        if (!ssnValid) {
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '600px',
            data: {message: "salesperson with this SSN is already in the artist base"}
          });
        } else {
          this.salespersonService.updateArtist(this.salespersonForm).subscribe(
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
