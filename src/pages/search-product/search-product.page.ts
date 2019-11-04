import { CustomStorage } from './../../utils/CustomStorage';
import { Search } from './../../providers/products/search';
import { Component } from "@angular/core";
import {
  LoadingController,
  NavController,
  AlertController
} from "@ionic/angular";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: "app-search-product",
  templateUrl: "search-product.page.html",
  styleUrls: ["search-product.page.scss"]
})
export class SearchProductPage {
  loading: any;
  search: {
    selected: string;
    barcode: string;
    productName: string;
    position: { description: string; lat: number; lng: number };
  };

  constructor(
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public barcodeScanner: BarcodeScanner,
    public alert: AlertController,
    public searchProvider: Search
  ) {
    this.search = {
      selected: "",
      barcode: "",
      productName: "",
      position: {
        description: "",
        lat: 0,
        lng: 0
      }
    };
  }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: "Connecting ..."
    });
  }

  scanBarcode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        this.search.barcode = barcodeData.text;
      })
      .catch(err => {
        this.search.barcode = "No se pudo capturar código de barras.";
        console.log(err);
        this.alert
          .create({
            header: "Error al leer código de barras",
            message:
              "Se ha presenado un error al momento de leer el código de barras.",
            buttons: ["OK"]
          })
          .then(alertInstance => {
            alertInstance.present();
          });
      });
  }

  async goToSearchResults() {
    this.searchProvider.search(this.search).then(results=>{
      CustomStorage.set("results", results);
      this.navCtrl.navigateForward("search-results", {
        queryParams: {
          productName: this.search.productName
        }
      });
    })
  }
}
