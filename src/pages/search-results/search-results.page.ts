import { Component } from '@angular/core';
import { LoadingController, NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-search-results',
  templateUrl: 'search-results.page.html',
  styleUrls: ['search-results.page.scss'],
})
export class SearchResultsPage {
  loading: any;
  constructor(
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public alertCtrl: AlertController) {}

    async ngOnInit() {
      this.loading = await this.loadingController.create({
        message: 'Connecting ...'
      });
    }

    async goToSearchResults() {
      this.navCtrl.navigateForward('search-results');
    }
}
