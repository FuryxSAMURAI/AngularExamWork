import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme: boolean = false;

  constructor() { }

  public toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme();
  }

  public isDarkThemeEnabled(): boolean {
    return this.isDarkTheme;
  }

  private applyTheme(): void {
    const theme = this.isDarkTheme ? 'dark-theme' : 'light-theme';
    document.body.setAttribute('data-theme', theme);
  }
}
