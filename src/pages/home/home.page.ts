import { StorageKeyEnum } from "src/utils/Enums";
import { CustomStorage } from "./../../utils/CustomStorage";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {
  LoadingController,
  NavController,
  AlertController
} from "@ionic/angular";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Platform } from "@ionic/angular";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Subscription } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  loading: any;
  data: any;

  constructor(
    private router: Router,
    private platform: Platform,
    private google: GooglePlus,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public barcodeScanner: BarcodeScanner,
    public alert: AlertController
  ) {
    this.data = {
      name: CustomStorage.get(StorageKeyEnum.Name)
    };
  }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: "Connecting ..."
    });
  }

  async presentLoading(loading) {
    await loading.present();
  }

  goToAddProduct(params) {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        console.log(barcodeData);
        // TODO: implementar sservicio para buscar producto
        this.navCtrl.navigateForward("add-product", {
          queryParams: {
            barcodeData: barcodeData
          }
        });
      })
      .catch(err => {
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

  goToSearchProduct(params) {
    this.navCtrl.navigateForward("search-product");
  }

  logout() {
    this.alert
      .create({
        header: "Cerrar Sesión",
        message: "¿Está seguro que desea cerrar sesión?",
        buttons: [
          {
            text: "Cancelar",
            role: "cancel"
          },
          {
            text: "OK",
            handler: () => {
              CustomStorage.set(StorageKeyEnum.Token, "");
              CustomStorage.set(StorageKeyEnum.AuthToken, "");
              CustomStorage.set(StorageKeyEnum.Name, "");
              this.navCtrl.navigateRoot("login");
              this.google
                .logout()
                .then(res => {
                  console.log(res);
                })
                .catch(err => {
                  console.log(err);
                });
            }
          }
        ]
      })
      .then(alertInstance => {
        alertInstance.present();
      });
  }
}
