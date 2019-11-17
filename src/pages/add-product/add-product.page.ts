import { ProductProvider } from './../../providers/products/product';
import { Component } from "@angular/core";
import {
  LoadingController,
  NavController,
  AlertController
} from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from 'src/models/Product';

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
    public router: Router,
    public productProvider: ProductProvider
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
    if(!this.validateForm()){return}
    let oProduct:Product = new Product( 
    Number.parseInt(this.barcodeData.text.toString()),
    this.product.name,
    Number.parseFloat(this.product.price),
    this.position.description);
    console.log(oProduct);    

    this.productProvider.save(oProduct).subscribe(
      (response: any) => {
        console.log(response);
        this.showSuccessMessage();
      },
      error => {
        this.showErrorMessage("Error al guardar el  producto: "+error);
      }
    ); 
  }

  validateForm(){
    let sError = '';
    if(this.product.name.trim() == ''){
      sError = 'Recuerde ingresar el nombre del producto';
    }    
    if(sError == '' && (this.product.price == '' || isNaN(this.product.price))){
      sError = 'Recuerde ingresar el precio del producto';
    }
    if(sError == '' && this.position.description.trim() == ''){
      sError = 'Recuerde ingresar la ubicación del producto';
    }
    if(sError != ''){
      this.showErrorMessage(sError);
      return false;
    }
    return true;
  }

  async showSuccessMessage(){
    this.alertCtrl
      .create({
        message: 'Producto agregado con éxito',
        buttons: [
          {
            text: 'OK',
            handler: () => {              
              this.navCtrl.navigateRoot('home');
            }
          }
        ]
      })
      .then(res => {
        res.present();
      });
  }

  async showErrorMessage(error:string){
    this.alertCtrl
      .create({
        message: error,
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
}
