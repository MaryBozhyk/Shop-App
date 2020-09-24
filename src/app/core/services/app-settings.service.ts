import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';
import { Config } from './../models';
import { HttpClient } from '@angular/common/http';

import { catchError, retry, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
  key = 'user_Data';
  defaultSettings: Config = {
    login: 'user',
    pass: 'user'
  };

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) { }

  uploadConfigInfo() {
    const dataFromLocalStorage =  this.localStorageService.getItem(this.key);
    if (dataFromLocalStorage) {
      return dataFromLocalStorage;
    } else {
      return this.http.get('assets/app-settings.json')
      .pipe(
        retry(2),
        tap(value => {
          this.localStorageService.setItem(this.key, value);
        }),
        catchError((err) => {
          this.localStorageService.setItem(this.key, this.defaultSettings);
          return of({ error: true, message: err.message });
        })
      );
    }

  }
}
