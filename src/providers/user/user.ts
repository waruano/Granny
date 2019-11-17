import { Injectable } from "@angular/core";

import { Api } from "../api/api";
import { URLApisEnum, SecurityServicesEnum } from 'src/utils/Enums';

@Injectable()
export class UserProvider {
  constructor(public api:Api) {
    this.api.url = URLApisEnum.Security;
  }

  login(params: any) {
    let seq = this.api.post(SecurityServicesEnum.Login, params);
    return seq;
  }

  signup(params: any) {
    let seq = this.api.post(SecurityServicesEnum.Users, params);
    return seq;
  }
}
