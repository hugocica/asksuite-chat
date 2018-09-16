import {Injectable} from '@angular/core';

const themeAsksuite = require('../../shared/styles/themes/theme-asksuite.scss');

@Injectable()
export class ThemesService {

  styleTag: any;
  defaultTheme: string = 'H';

  constructor() {
    this.createStyle();
    this.injectStylesheet(themeAsksuite);
  }

  private createStyle() {
    const head = document.head || document.getElementsByTagName('head')[0];
    this.styleTag = document.createElement('style');
    this.styleTag.type = 'text/css';
    this.styleTag.id = 'appthemes';
    head.appendChild(this.styleTag);
  }


  injectStylesheet(css) {
    this.styleTag.innerHTML = css;
  }

  getDefaultTheme() {
    return this.defaultTheme;
  }

}
