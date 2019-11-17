import { CustomStorage } from './../../utils/CustomStorage';
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingController, NavController, AlertController } from "@ionic/angular";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Platform } from "@ionic/angular";

import { UserProvider } from './../../providers/user/user';
import { StorageKeyEnum } from 'src/utils/Enums';

@Component({
  selector: "app-login",
  templateUrl: "login.page.html",
  styleUrls: ["login.page.scss"]
})
export class LoginPage {
  constructor(
    private router: Router,
    private platform: Platform,
    public alertCtrl: AlertController,
    private google: GooglePlus,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public userProvider: UserProvider
  ) {}

  async ngOnInit() {
    this.validateUser();
  }

  async validateUser(){
    let loading = await this.loadingController.create({
      message: "Connecting ..."
    });
    loading.present().then(res=>{
      let token = CustomStorage.get(StorageKeyEnum.Token);
      if (token && token != "") {
          loading.dismiss();
          this.userProvider.login({googleToken: token}).subscribe(
            (response: any) => {
              console.log(response);
              if ( typeof response.token != "undefined" && response.token != "") {
                CustomStorage.set(StorageKeyEnum.AuthToken,response.token);
                this.navCtrl.navigateRoot("home");
              }else{
                this.onLoginError(response);
              }
            },
            error => {
              this.onLoginError(error);
            }
          );      
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
      });
  }
  onLoginSuccess(idToken) {
    console.log(idToken);
    this.userProvider.signup({googleToken: idToken}).subscribe(
      (res: any) => {
        console.log(res);   
        CustomStorage.set(StorageKeyEnum.Token,idToken);       
        this.validateUser();
      },
      error => {
        if(error.status == 409 || error.status == 200){
          CustomStorage.set(StorageKeyEnum.Token,idToken);  
          this.validateUser();
        }else{
          this.onLoginError(error);
        }
      }
    );  
  }

  onLoginError(error) {
    console.log('Error',error);
    this.alertCtrl
      .create({
        message: "En este momento presentamos algunos problemas, intentalo de nuevo mas tarde",
        buttons: [
          {
            text: "OK",
            handler: () => {
              this.login();
            }
          }
        ]
      })
      .then(res => {
        res.present();
      });
  }
}
