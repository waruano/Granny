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

  constructor(public http: HttpClient) {
    
  }

  get(endpoint: string) {
    let token = CustomStorage.get(StorageKeyEnum.AuthToken);
    
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndpbGxpYW1ydWFub0B1bmljYXVjYS5lZHUuY28iLCJ1bmlxdWVfbmFtZSI6IjVkY2UzYjdiN2U3MmJlMDAwMTc1YTJlOCIsIm5iZiI6MTU3Mzg4NjU3NCwiZXhwIjoxNTc0NDkxMzc0LCJpYXQiOjE1NzM4ODY1NzR9.LZjcJGB_noDRSi3LdoPw99kj7-y3BEjrfHkWuHwjj8M'
        
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
