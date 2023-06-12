import { Component, OnInit } from '@angular/core';
import {ArtistService} from "../_services/artist.service";
import {Artist} from "../_models/artist.model";

@Component({
  selector: 'app-active-artists-dialog',
  templateUrl: './active-artists-dialog.component.html',
  styleUrls: ['./active-artists-dialog.component.scss']
})
export class ActiveArtistsDialogComponent implements OnInit {
  artistsList: Artist[]
  displayedColumns: string[] = ['position', 'name', 'address', 'phone', 'ssn', 'usualType', 'usualMedium', 'usualStyle', 'thisYearSelling', 'lastYearSelling'];

  constructor(private artistService: ArtistService) { }

  ngOnInit(): void {
    this.artistService.getActiveAllArtists().subscribe(
      result => {
        this.artistsList = result;
      },
      err => {
        // this.errorMessage = err.error.message;
      });
  }

}
