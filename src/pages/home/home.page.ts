import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loading: any;
  constructor(private router: Router,
    private platform: Platform,
    private google:GooglePlus,
    public loadingController: LoadingController,
    public navCtrl: NavController) {}

    async ngOnInit() {
      this.loading = await this.loadingController.create({
        message: 'Connecting ...'
      });
    }

    async presentLoading(loading) {
      await loading.present();
    }

    async login() {
      let params;
      if (this.platform.is('android')) {
        params = {
          // 'webClientId': '42424115138-mu5fj5kvpnhi63bmd6e2jkiv9ifirceo.apps.googleusercontent.com',
          'offline': true
        }
      }
      else {
        params = {}
      }
      this.google.login(params)
        .then((response) => {
          const { idToken, accessToken } = response

          console.log(response)
          this.onLoginSuccess(idToken, accessToken);
          alert('error:' + idToken + accessToken)
        }).catch((error) => {
          console.log(error)
          alert('error:' + JSON.stringify(error))
        });
    }
    onLoginSuccess(accessToken, accessSecret) {
      console.log(accessToken)
    }

    onLoginError(err) {
      console.log(err);
    }

    goToAddProduct(params){
      if (!params) params = {};
      this.navCtrl.navigateForward("add-product");
    }
    
    goToSearchProduct(params){
      this.navCtrl.navigateForward("search-product");
    }
}
