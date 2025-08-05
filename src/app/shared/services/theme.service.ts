import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private storageKey = 'preferred-theme';
  private defaultTheme: ThemeMode = 'light';

  private themeSubject = new BehaviorSubject<ThemeMode>(this.getInitialTheme());
  public theme$ = this.themeSubject.asObservable();

  constructor() {
    // Check for system preference if no stored preference
    if (!localStorage.getItem(this.storageKey)) {
      this.checkSystemPreference();
    }

    // Apply the theme on service initialization
    this.applyTheme(this.themeSubject.value);

    // Listen for system preference changes
    this.listenForSystemChanges();
  }

  private getInitialTheme(): ThemeMode {
    const savedTheme = localStorage.getItem(this.storageKey) as ThemeMode;
    return savedTheme || this.defaultTheme;
  }

  private checkSystemPreference(): void {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }

  private listenForSystemChanges(): void {
    if (window.matchMedia) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          if (!localStorage.getItem(this.storageKey)) {
            this.setTheme(e.matches ? 'dark' : 'light');
          }
        });
    }
  }

  public setTheme(theme: ThemeMode): void {
    localStorage.setItem(this.storageKey, theme);
    this.themeSubject.next(theme);
    this.applyTheme(theme);
  }

  public toggleTheme(): void {
    const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  private applyTheme(theme: ThemeMode): void {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }
}
