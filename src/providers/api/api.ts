import { Environment } from './../../utils/Enums';
import { CustomStorage } from './../../utils/CustomStorage';
import { StorageKeyEnum } from 'src/utils/Enums';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  public url: string;

  constructor(public http: HttpClient) {}

  get(endpoint: string) {
    let token = CustomStorage.get(StorageKeyEnum.AuthToken);
       
    let reqOpts = {headers:{
      'Authorization':'Bearer '+token,
      'Content-Type': 'application/json',
      'Accept':'application/json'      
    }};
    let service = this.url + "/" + endpoint;
    return this.http.get(service, reqOpts);
  }

  post(endpoint: string, body: any) {
    let reqOpts = {headers:{
      'Content-Type': 'application/json',
      'Accept':'application/json'
    }};
    return this.http.post(this.url + "/" + endpoint, JSON.stringify(body), reqOpts);
  }

  postToken(endpoint: string, body: any) {
    let token = CustomStorage.get(StorageKeyEnum.AuthToken);
    
    let reqOpts = {headers:{
      'Authorization':'Bearer '+token,
      'Content-Type': 'application/json',
      'Accept':'application/json'      
    }};
    return this.http.post(this.url + "/" + endpoint, JSON.stringify(body), reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + "/" + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + "/" + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + "/" + endpoint, body, reqOpts);
  }
}
