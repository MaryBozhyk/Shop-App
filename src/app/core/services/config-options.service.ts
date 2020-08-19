import { Injectable } from '@angular/core';
import { Config } from './../models';

@Injectable()
export class ConfigOptionsService {
  configOptions: Config = {};

  constructor() { }

  setOption(newOptions: Config): Config {
    return Object.assign(this.configOptions, newOptions);
  }

  getOption(key: string): Config {
    if (this.configOptions.hasOwnProperty(key)) {
      return this.configOptions;
    } else {
      return new Error('There is not such config!');
    }
  }
}
