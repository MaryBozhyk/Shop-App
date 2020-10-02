import { Injectable } from '@angular/core';
import { Config } from './../models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  setItem(key: string, value: Config | string): void {
    return window.localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): string {
    return window.localStorage.getItem(key);
  }

  removeItem(key: string): void {
    // зачем return?
    return window.localStorage.removeItem(key);
  }
}
