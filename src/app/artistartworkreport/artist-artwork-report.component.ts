import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ArtworkService} from "../_services/artwork.service";
import {Artist} from "../_models/artist.model";
import {Artwork} from "../_models/artwork.model";
import {ArtistService} from "../_services/artist.service";

@Component({
  selector: 'app-artistartworkreport',
  templateUrl: './artist-artwork-report.component.html',
  styleUrls: ['./artist-artwork-report.component.css']
})
export class ArtistArtworkReportComponent implements OnInit {
  artist: Artist
  artworksList: Artwork[]
  displayedColumns: string[] = ['title', 'artType', 'artMedium', 'artStyle', 'askingPrice', 'date', 'sellingPrice'];


  constructor(public dialogRef: MatDialogRef<ArtistArtworkReportComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private artistService: ArtistService) {
  }

  ngOnInit(): void {
    this.artist = this.data.artist
    this.artworksList = this.data.artworks
  }


}
