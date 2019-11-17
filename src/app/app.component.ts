import { Router } from "@angular/router";
import { Component } from "@angular/core";

import { Platform, AlertController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alert: AlertController,
    private route: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.platform.backButton.subscribe(() => {
        if (this.route.url == "/home" || this.route.url == "/login") {
          this.alert
            .create({
              header: "Salir de la aplicación",
              message: "¿Está seguro que desea salir de la aplicación?",
              buttons: [
                {
                  text: "Cancelar",
                  role: "cancel"
                },
                {
                  text: "OK",
                  handler: () => {
                    navigator["app"].exitApp();
                  }
                }
              ]
            })
            .then(alert => {
              alert.present();
            });
        }
      });
    });
  }
}
