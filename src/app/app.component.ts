import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    CommonModule,
  ],
  template: `
    <div class="theme-toggle">
      <button
        mat-icon-button
        (click)="toggleTheme()"
        [matTooltip]="isDark ? 'Светлая тема' : 'Тёмная тема'"
      >
        <mat-icon>{{ isDark ? 'light_mode' : 'dark_mode' }}</mat-icon>
      </button>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .theme-toggle {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 1000;
    }
  `],
})
export class AppComponent implements OnInit {
  isDark = false;

  ngOnInit() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      this.setDarkTheme();
    } else {
      this.setLightTheme();
    }
  }

  toggleTheme() {
    this.isDark ? this.setLightTheme() : this.setDarkTheme();
  }

  setDarkTheme() {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
    this.isDark = true;
    localStorage.setItem('theme', 'dark');
  }

  setLightTheme() {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    this.isDark = false;
    localStorage.setItem('theme', 'light');
  }
}
