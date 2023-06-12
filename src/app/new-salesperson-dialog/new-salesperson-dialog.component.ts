import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ArtistService} from "../_services/artist.service";
import {Salesperson} from "../_models/salesperson.model";
import {SalespersonService} from "../_services/salesperson.service";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";

@Component({
  selector: 'app-new-salesperson-dialog',
  templateUrl: './new-salesperson-dialog.component.html',
  styleUrls: ['./new-salesperson-dialog.component.scss']
})
export class NewSalespersonDialogComponent implements OnInit {
  newSalespersonForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewSalespersonDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private salespersonService: SalespersonService,
              private dialog: MatDialog,) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.newSalespersonForm = new FormGroup({
      name: new FormControl({value: null, disabled: false}, Validators.required),
      surname: new FormControl({value: null, disabled: false}, Validators.required),
      ssn: new FormControl({value: null, disabled: false}, Validators.required),
    });
  }
  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }
  onSubmit() {
    this.salespersonService.checkSalespersonSSNExist(this.newSalespersonForm.get('ssn')!.value).subscribe(
      alreadyExist => {
        console.log(alreadyExist);
        if (alreadyExist) {
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '600px',
            data: {message: "artist with this SSN is already in the artist base"}
          });
        } else {
          this.salespersonService.addSalesperson(this.newSalespersonForm).subscribe(
            response => {
              this.dialogRef.close({event: 'Success'});
            }
          );

        }
      }
    );
  }
}
