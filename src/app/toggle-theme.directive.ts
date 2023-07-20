import { Directive, HostListener } from '@angular/core';
import { ThemeService } from './theme.service';

@Directive({
  selector: '[appToggleTheme]'
})
export class ToggleThemeDirective {

  constructor(private themeService: ThemeService) { }

  @HostListener('click')
  onClick(): void {
    this.themeService.toggleTheme();
  }

}
