import { Component } from '@angular/core';
import { ThemeService } from './theme.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular_Exam';
  // constructor(private themeService: ThemeService) { }

  // toggleTheme(): void {
  //   this.themeService.toggleTheme();
  // }

  // isDarkThemeEnabled(): boolean {
  //   return this.themeService.isDarkThemeEnabled();
  // }

  constructor(private themeService: ThemeService) { }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  isDarkThemeEnabled(): boolean {
    return this.themeService.isDarkThemeEnabled();
  }


}
