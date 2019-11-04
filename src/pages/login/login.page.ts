import { CustomStorage } from './../../utils/CustomStorage';
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingController, NavController } from "@ionic/angular";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Platform } from "@ionic/angular";

import { User } from './../../providers/user/user';

@Component({
  selector: "app-login",
  templateUrl: "login.page.html",
  styleUrls: ["login.page.scss"]
})
export class LoginPage {
  constructor(
    private router: Router,
    private platform: Platform,
    private google: GooglePlus,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public user: User
  ) {}

  async ngOnInit() {
    let loading = await this.loadingController.create({
      message: "Connecting ..."
    });
    loading.present().then(res=>{
      let user = CustomStorage.get("user");
      if (user && user.Name) {
          loading.dismiss();
          this.navCtrl.navigateRoot("home")       
      } else {
        loading.dismiss();
      }      
    })
  }

  async presentLoading(loading) {
    await loading.present();
  }

  async login() {
    let params = {
      'webClientId': '42424115138-3cn8t4rrp3qcppqi1nt96dg0609mq2p7.apps.googleusercontent.com',
      offline: true
    };

    this.google
      .login(params)
      .then(response => {
        const { idToken } = response;

        console.log(response);

        this.onLoginSuccess(idToken);
      })
      .catch(error => {
        console.log(error);
        alert("error:" + JSON.stringify(error));
      });
  }
  onLoginSuccess(idToken) {
    console.log(idToken);
    this.user.login({idToken: idToken}).then(res => {
      console.log(res);
      this.navCtrl.navigateRoot("home");
    }, err=>{
      console.log(err)
    });    
  }

  onLoginError(err) {
    console.log(err);
  }
}
