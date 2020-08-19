import { Injectable } from '@angular/core';
import { Config } from './../models';

@Injectable()
export class LocalStorageService {
  constructor() { }

  setItem(key: string, value: Config | string): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): string {
    return window.localStorage.getItem(key);
  }

  removeItem(key: string): void {
    window.localStorage.removeItem(key);
  }
}
