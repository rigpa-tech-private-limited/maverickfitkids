import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { Platform } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../config/config';

let apiUrl = AppConfig.API_BASE_URL;


@Injectable()
export class AuthServiceProvider {

  constructor(public platform: Platform, public httpIonic: HTTP, public httpAngular: Http) {
    console.log('Hello AuthService Provider');
  }

  postData(credentials, type) {
    console.log(this.platform.is('core') || this.platform.is('mobileweb'));

    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log("API_URL-->", apiUrl + type);
        console.log("API_INPUT_DATA-->", JSON.stringify(credentials));
        this.httpAngular.post(apiUrl + type, JSON.stringify(credentials), { headers: headers })
          .subscribe(res => {
            console.log("API_OUTPUT_DATA-->", res.json());
            resolve(res.json());
          }, (err) => {
            console.log("API_CALL_ERROR-->", err);
            reject(err);
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        this.httpIonic.setDataSerializer('json');
        console.log("API_URL-->", apiUrl + type);
        console.log("API_INPUT_DATA-->", JSON.stringify(credentials));
        this.httpIonic.post(apiUrl + type, credentials, { "Content-Type": "application/json" })
          .then(res => {
            console.log("API_OUTPUT_DATA-->", JSON.parse(res.data));
            resolve(JSON.parse(res.data));
          }, (err) => {
            reject(err);
          });
      });
    }
  }

  getData(urlData) {
    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      return new Promise((resolve, reject) => {
        this.httpAngular.get(apiUrl + urlData)
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        this.httpIonic.get(apiUrl + urlData, {}, {})
          .then(res => {
            resolve(JSON.parse(res.data));
          }, (err) => {
            reject(err);
          });
      });
    }
  }

}
