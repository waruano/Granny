import {
  ProductServicesEnum,
  SearchServicesEnum,
  Environment
} from "./../../utils/Enums";
import { Product } from "./../../models/Product";
import { URLApisEnum } from "src/utils/Enums";
import { Injectable } from "@angular/core";
import { Api } from "../api/api";

@Injectable()
export class SearchProvider {
  constructor(public api: Api) {
    this.api.url = URLApisEnum.Search;
  }

  search(options) {
    return this[options.selected](options);
  }

  byName(options: any) {
    let endpoint =
      SearchServicesEnum.ByName +"/" + encodeURIComponent(options.productName);
    return this.api
      .get(endpoint)
      .toPromise()
      .then(searchResult => {
        return searchResult;
      }).catch(error =>{
        console.log(error);
        return [];
      });
  }

  byBarcode(options: any) {
    let endpoint = SearchServicesEnum.ByCode + "/" + options.barcode;
    return this.api
      .get(endpoint)
      .toPromise()
      .then(searchResult => {
        return [searchResult];
      }).catch(error =>{
        console.log(error);
        return [];
      });
  }

  byLocation(options: any) {
    let endpoint =
      SearchServicesEnum.ByLocation +"/" + encodeURIComponent(options.position.description);
    return this.api
      .get(endpoint)
      .toPromise()
      .then(searchResult => {
        return searchResult;
      });
  }
}
