import { ProductServicesEnum } from './../../utils/Enums';
import { Product } from './../../models/Product';
import { URLApisEnum } from 'src/utils/Enums';
import { Injectable } from "@angular/core";
import { Api } from "../api/api";

@Injectable()
export class ProductProvider {
  
  constructor(public api: Api) {
    this.api.url = URLApisEnum.Product;
  }

  save(oProduct:Product){
    let seq = this.api.postToken(ProductServicesEnum.Save,oProduct);
    return seq;
  }
}