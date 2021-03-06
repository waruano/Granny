import { Component } from "@angular/core";
import {
  LoadingController,
  NavController,
  AlertController
} from "@ionic/angular";
import { Router, ActivatedRoute } from '@angular/router';

import { ResultProduct } from './../../models/ResultProduct';
import { CustomStorage } from './../../utils/CustomStorage';

@Component({
  selector: "app-search-results",
  templateUrl: "search-results.page.html",
  styleUrls: ["search-results.page.scss"]
})
export class SearchResultsPage {
  loading: any;
  results: ResultProduct[];
  searchLabel: string;

  constructor(
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.results = [];
    this.route.queryParams.subscribe(params => {
      this.searchLabel = params.searchLabel;
    });
  }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: "Connecting ..."
    });
    this.results = CustomStorage.get("results");
  }

}
