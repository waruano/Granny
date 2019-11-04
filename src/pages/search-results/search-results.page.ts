import { Component } from "@angular/core";
import {
  LoadingController,
  NavController,
  AlertController
} from "@ionic/angular";

@Component({
  selector: "app-search-results",
  templateUrl: "search-results.page.html",
  styleUrls: ["search-results.page.scss"]
})
export class SearchResultsPage {
  loading: any;
  results: any[]; 
  constructor(
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {
    this.results = [{
      name: "item 1"
    },{
      name: "item 2"
    },{
      name: "item 3"
    }]
  }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: "Connecting ..."
    });
  }
}
