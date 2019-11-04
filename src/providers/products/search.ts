import { Injectable } from "@angular/core";

import { Api } from "../api/api";
import { CustomStorage } from "../../utils/CustomStorage";

@Injectable()
export class Search {
  
  constructor(public api: Api) {}

  search(options) {
    return this[options.selected](options);
  }

  byName(options: any) {
    return this.api
      .get("search-by-name", options)
      .toPromise()
      .then(searchResult => {
        return searchResult;
      });
  }

  byBarcode(options: any) {
    return this.api
      .get("search-by-barcode", options)
      .toPromise()
      .then(searchResult => {
        return searchResult;
      });
  }

  byLocation(options: any) {
    return this.api
      .get("search-by-location", options)
      .toPromise()
      .then(searchResult => {
        return searchResult;
      });
  }
}