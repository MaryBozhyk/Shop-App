import { Component, OnInit, Optional, Inject } from '@angular/core';

import {
  ConfigOptionsService,
  ConstanService,
  GeneratorService,
  LocalStorageService,
  GeneratorServiceN,
  GeneratorFactory,
  Config
} from '../../../core';

const newConstantService = new ConstanService();
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [
    { provide: LocalStorageService, useClass: LocalStorageService },
    ConfigOptionsService,
    { provide: ConstanService, useValue: newConstantService },
    { provide: GeneratorServiceN, useFactory: GeneratorFactory(15), deps: [GeneratorService] }
  ]
})
export class AboutComponent implements OnInit {
  configData: Config = {
    id: '123',
    name: 'user',
    login: 'user123'
  };

  constructor(
    @Optional() private localStorageService: LocalStorageService,
    @Optional() private configOptionsService: ConfigOptionsService,
    @Optional() private constanService: ConstanService,
    @Inject(GeneratorServiceN) private Generator: string
    ) { }

  ngOnInit(): void {
    // LocalStorageService testing
    this.localStorageService.setItem('user1', this.configData);
    console.log('LocalStorageService result: ', this.localStorageService.getItem('user1'));
    this.localStorageService.removeItem('user1');
    console.log('LocalStorageService result(after delete user): ', this.localStorageService.getItem('user1'));

    // ConfigOptionsService testing
    this.configOptionsService.setOption(this.configData);
    console.log('ConfigOptionsService result: ', this.configOptionsService.getOption('id'));
    console.log('ConfigOptionsService result (not correct key): ', this.configOptionsService.getOption('id1'));

    // ConstanService testing
    console.log('ConstanService result: ', this.constanService.configData);

    // GeneratorService testing
    console.log('GeneratorService result: ', this.Generator);
  }
}
