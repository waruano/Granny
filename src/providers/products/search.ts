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
      SearchServicesEnum.ByName +
      "?nameProduct=" +
      encodeURI(options.productName);
    console.log(endpoint);
    if (Environment.env == "dev") {
      endpoint = SearchServicesEnum.ByName;
    }
    return this.api
      .get(endpoint)
      .toPromise()
      .then(searchResult => {
        return searchResult;
      });
  }

  byBarcode(options: any) {
    let endpoint = SearchServicesEnum.ByCode + "/" + options.barcode;
    if (Environment.env == "dev") {
      endpoint = SearchServicesEnum.ByCode;
    }
    return this.api
      .get(endpoint)
      .toPromise()
      .then(searchResult => {
        return [searchResult];
      });
  }

  byLocation(options: any) {
    let endpoint =
      SearchServicesEnum.ByLocation +
      "/" +
      encodeURI(options.position.description);
    if (Environment.env == "dev") {
      endpoint = SearchServicesEnum.ByLocation;
    }
    return this.api
      .get(endpoint)
      .toPromise()
      .then(searchResult => {
        return searchResult;
      });
  }
}
