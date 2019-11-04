import { CustomStorage } from './../../utils/CustomStorage';
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

  constructor(
    private router: Router,
    private platform: Platform,
    private google: GooglePlus,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public barcodeScanner: BarcodeScanner,
    public alert: AlertController
  ) {}

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: "Connecting ..."
    });
  }

  async presentLoading(loading) {
    await loading.present();
  }

  async login() {
    let params;
    if (this.platform.is("android")) {
      params = {
        // 'webClientId': '42424115138-mu5fj5kvpnhi63bmd6e2jkiv9ifirceo.apps.googleusercontent.com',
        offline: true
      };
    } else {
      params = {};
    }
    this.google
      .login(params)
      .then(response => {
        const { idToken, accessToken } = response;

        console.log(response);
        this.onLoginSuccess(idToken, accessToken);
        alert("error:" + idToken + accessToken);
      })
      .catch(error => {
        console.log(error);
        alert("error:" + JSON.stringify(error));
      });
  }
  onLoginSuccess(accessToken, accessSecret) {
    console.log(accessToken);
  }

  onLoginError(err) {
    console.log(err);
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
              CustomStorage.set("user", "")
              this.navCtrl.navigateRoot("login");
              this.google.logout().then(res => {
                console.log(res);
              }).catch(err=>{
                console.log(err);
              })
            }
          }
        ]
      })
      .then(alertInstance => {
        alertInstance.present();
      });
  }
}
