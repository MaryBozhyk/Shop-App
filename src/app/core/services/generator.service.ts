import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  private possibleCharacters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  constructor() { }

  generateCombination(stringLength: number) {
    let randomCombination = "";
  
    for (let i = 0; i <  stringLength; i++) {
      randomCombination += this.possibleCharacters.charAt(Math.floor(Math.random() * this.possibleCharacters.length));
    }      
  
    return randomCombination;
  }
}
