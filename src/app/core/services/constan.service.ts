import { Injectable } from '@angular/core';
import { Config } from './../models';

@Injectable()
export class ConstanService {
  configData: Config = { App: 'TaskManager', Ver: '1.0', API_URL: 'http://test.com' };

  constructor() { }
}
