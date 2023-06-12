import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Artist} from "../_models/artist.model";
import {Customer} from "../_models/customer.model";
import {ArtistService} from "../_services/artist.service";
import {MatDialog} from "@angular/material/dialog";
import {CustomerService} from "../_services/customer.service";
import {NewArtistDialogComponent} from "../new-artist-dialog/new-artist-dialog.component";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";
import {AddNewCustomerDialogComponent} from "../add-new-customer-dialog/add-new-customer-dialog.component";
import {ApprovalDialogComponent} from "../approval-dialog/approval-dialog.component";
import {Salesperson} from "../_models/salesperson.model";
import {EditSalespersonComponent} from "../edit-salesperson/edit-salesperson.component";
import {EditCustomerComponent} from "../edit-customer/edit-customer.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit , AfterViewInit {

  customerList: Customer[]
  displayedColumns: string[] = ['position', 'name', 'address', 'phone', 'prefType', 'prefMedium', 'prefStyle', 'prefArtist', 'thisYearSelling', 'lastYearSelling', 'more'];
  dataSource : MatTableDataSource<Customer>

  constructor(private customerService: CustomerService, public dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer) {
  }

  ngOnInit(): void {
    this.loadCustomers()

  }
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe(
      result => {
        this.customerList = result;
        this.dataSource= new MatTableDataSource(this.customerList)
      },
      err => {
        // this.errorMessage = err.error.message;
      });
  }

  openAddCustomerDialog() {
     this.dialog.open(AddNewCustomerDialogComponent, {
      width: '50%',
      data: {}
    }).afterClosed().subscribe(result => {
      if (result.event == 'Success') {
        this.loadCustomers();

      } else if (result.event == 'Error') {
        const dialogRef = this.dialog.open(InfoDialogComponent, {
          width: '50%',
          data: {message: "Something went wrong. Try later."}
        })
      }

    });
  }

  // removeCustomer(id: number) {
  //   this.customerService.removeCustomer(id).subscribe(resp => {
  //     this.loadCustomers()
  //   }, error => {
  //       const dialogRef = this.dialog.open(InfoDialogComponent, {
  //         width: '50%',
  //         data: {message: "Something went wrong. Try later."}
  //       })
  //
  //   })
  // }
  delete(id: number) {
    this.dialog.open(ApprovalDialogComponent, {
      width: '600px',
      data: {message: "Are you sure you want to delete the Customer? The person will still be visible in related past sales."}
    }).afterClosed().subscribe(response => {
      if (response.event == 'Approved') {
        this.customerService.removeCustomer(id).subscribe(value => {
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '50%',
            data: {message: "Customer deleted"}
          })
          this.loadCustomers()
        }, error => {
          console.log(error.error)
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '50%',
            data: {message: error.error}
          })
        })
      }
    })
  }
  edit(customer: Customer) {
    const dialogRef = this.dialog.open(EditCustomerComponent, {
      width: '50%',
      data: {customer: customer}
    }).afterClosed().subscribe(result => {
      if (result.event == 'Success') {
        this.loadCustomers();
      }
    })
  }

  openPreferencesReport() {
  //   const dialogRef = this.dialog.open(EditCustomerComponent, {
  //     width: '50%',
  //     data: {customer: customer}
  //   })
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
