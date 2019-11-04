import { Component } from "@angular/core";
import {
  LoadingController,
  NavController,
  AlertController
} from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-add-product",
  templateUrl: "add-product.page.html",
  styleUrls: ["add-product.page.scss"]
})
export class AddProductPage {
  loading: any;
  barcodeData: { text: String };
  position: { description: string; lat: number; lng: number };
  product: any;

  constructor(
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.barcodeData = params.barcodeData;
      console.log(this.barcodeData);
    });
    this.position = {
      description: "",
      lat: 0,
      lng: 0
    };
    this.product = {
      name: "",
      price: ""
    };
  }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: "Connecting ..."
    });
  }

  async addProduct() {
    this.alertCtrl
      .create({
        message: "Producto agregado con éxito",
        buttons: [
          {
            text: "OK",
            handler: () => {
              let data = {
                code: this.barcodeData.text,
                name: this.product.name,
                price: this.product.price,
                location: this.position
              };
              console.log(data);
              this.navCtrl.navigateRoot("home");
            }
          }
        ]
      })
      .then(res => {
        res.present();
      });
  }
}
