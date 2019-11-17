import { Environment } from './../../utils/Enums';
import { SearchProvider } from './../../providers/products/search';
import { CustomStorage } from './../../utils/CustomStorage';
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
    public searchProvider: SearchProvider
  ) {
    this.initResult();
  }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: "Connecting ..."
    });
    this.initResult();
  }

  initResult(){
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

    this.loading.present().then(res => {
      this.searchProvider.search(this.search).then(results => {
        this.loading.dismiss();
        if( typeof results.length != 'undefined' && results.length > 0){
          CustomStorage.set("results", results);
          let searchLabel = this.createSearchLabel();
          this.navCtrl.navigateForward("search-results", {
            queryParams: {
              searchLabel: searchLabel
            }
          });
        }else{
          this.showMessage("No se encontraror resultados");
        }      
      });
    });
  }

  showMessage(message:string) {
    this.alertCtrl
      .create({
        message: message,
        buttons: [
          {
            text: "OK",
            handler: () => {
              this.alertCtrl.dismiss();
            }
          }
        ]
      })
      .then(res => {
        res.present();
      });
  }

  createSearchLabel(){
    var searchLabel = "";
    switch(this.search.selected){
      case 'byName':
        searchLabel = this.search.productName;
        break;
      case 'byBarcode':
        searchLabel = this.search.barcode;
        break;
      case 'byLocation':
        searchLabel = this.search.position.description;
        break;
    }
    return searchLabel;
  }
}
