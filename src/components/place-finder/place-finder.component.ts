import { Component, OnInit, Input, NgZone } from "@angular/core";

declare var google;

@Component({
  selector: "place-finder",
  templateUrl: "./place-finder.component.html",
  styleUrls: ["./place-finder.component.scss"]
})
export class PlaceFinderComponent implements OnInit {
  @Input()
  position: any;

  autocomplete: { input: String };
  placeResults: any[];
  GoogleAutoComplete = new google.maps.places.AutocompleteService();
  geocoder = new google.maps.Geocoder();

  constructor(public zone: NgZone) {
    this.autocomplete = {
      input: ""
    };
  }

  ngOnInit() {}

  updateSearchResults() {
    if (this.autocomplete.input == "") {
      this.placeResults = [];
      return;
    }
    this.GoogleAutoComplete.getPlacePredictions(
      {
        input: this.autocomplete.input
      },
      (predictions, status) => {
        this.placeResults = [];
        if (predictions == null) {
          return;
        }
        this.zone.run(() => {
          predictions.forEach(prediction => {
            this.placeResults.push(prediction);
          });
        });
      }
    );
  }

  selectSearchResult(place) {
    this.placeResults = [];
    this.zone.run(() => {
      this.autocomplete.input = place.description;
    });
    console.log(place);
    this.geocoder.geocode({ placeId: place.place_id }, (results, status) => {
      if (status == "OK" && results[0]) {
        this.position.description = place.description;
       if (this.position.description && this.position.description.length > 0) {
        this.position.description = this.position.description.split("Colombia")[0];
       } 
        this.position.lat = results[0].geometry.location.lat();
        this.position.lng = results[0].geometry.location.lng();
      }
    });
  }
}
