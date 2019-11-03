import { Component } from '@angular/core';
import { LoadingController, NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-product',
  templateUrl: 'add-product.page.html',
  styleUrls: ['add-product.page.scss'],
})
export class AddProductPage {
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

    async addProduct() {
      this.alertCtrl.create({
        message: "Producto agregado con éxito",
        buttons: [{
          text: 'OK',
          handler: ()=>{
            this.navCtrl.navigateRoot('home');
          }
        }]
      }).then(res=>{
        res.present();
      })
    }
}
