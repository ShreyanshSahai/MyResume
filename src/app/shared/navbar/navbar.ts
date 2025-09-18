import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeMode } from '../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit, OnDestroy {
  isDarkTheme = false;
  isMenuOpen = false;
  private themeSubscription: Subscription | null = null;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeSubscription = this.themeService.theme$.subscribe(
      (theme: ThemeMode) => {
        this.isDarkTheme = theme === 'dark';
      }
    );
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      const navbarCollapse = document.getElementById('navbarNav');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        // @ts-ignore - Using Bootstrap's jQuery API
        window['bootstrap'].Collapse.getInstance(navbarCollapse)?.hide();
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const navbarCollapse = document.getElementById('navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    if (navbarCollapse && navbarToggler && 
        navbarCollapse.classList.contains('show') && 
        !navbarCollapse.contains(event.target as Node) && 
        !navbarToggler.contains(event.target as Node)) {
      
      const target = event.target as HTMLElement;
      const clickableElement = target.closest('a, button, input[type="submit"]');
      
      if (clickableElement) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      this.closeMenu();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    this.updateActiveLink();
  }

  private updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        const id = section.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}
