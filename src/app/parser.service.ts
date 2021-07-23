import { WrappedNodeExpr } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  constructor() { }

  public parse(resp: any) : string[][] 
  {
    let parsedCSV: string[][] = [];
    for(let line of resp["ParsedResults"][0]["TextOverlay"]["Lines"]) {
      let wordsOfLine: string[] = [];
      for(let word of line["Words"]) {
        wordsOfLine.push(word["WordText"]);
      }
      parsedCSV.push(wordsOfLine);
    }
    parsedCSV = this.clean(parsedCSV);
    return parsedCSV;
  }

  private clean(res: string[][]): string[][] {
    res = res.map((line: string[]) => {
      line = line.map(word => {
        word = word.replace(/\|/g, '');
        word = word.replace(/S|s/g, '5');
        word = word.replace(/B/g, '8');
        word = word.replace(/Z/g, '2');
        word = word.replace(/O|o|Q|D/g, '0');
        word = word.replace(/I|l/g, '1');
        return word
      })
      
      line = line.filter((word: string) => {
        return word != '';
      })
      return line;
    })
    return res;
  }
}
