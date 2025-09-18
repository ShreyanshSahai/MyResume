import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService, ThemeMode } from '../../shared/services/theme.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnInit, OnDestroy {
  currentTheme: ThemeMode = 'light';
  private themeSubscription: Subscription | null = null;
  
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  isSubmitting = false;
  isSubmitted = false;
  hasError = false;
  errorMessage = '';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeSubscription = this.themeService.theme$.subscribe(
      (theme: ThemeMode) => {
        this.currentTheme = theme;
      }
    );

    this.initializeAnimations();
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  private initializeAnimations() {
    const formElements = document.querySelectorAll('.form-group, .contact-item, .social-icon');
    
    formElements.forEach((element, index) => {
      setTimeout(() => {
        (element as HTMLElement).style.opacity = '1';
        (element as HTMLElement).style.transform = 'translateY(0)';
      }, 100 * index);
    });
  }
  
  async submitForm() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    this.hasError = false;
    this.isSubmitted = false;
    this.errorMessage = '';
    
    const contactForm = document.querySelector('form') as HTMLFormElement;
    
    try {
      const formData = new FormData();
      
      formData.append('name', this.formData.name);
      formData.append('email', this.formData.email);
      formData.append('subject', this.formData.subject);
      formData.append('message', this.formData.message);
      
      formData.append('access_key', environment.web3FormsAccessKey);
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        this.formData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
        this.isSubmitted = true;
        this.hasError = false;
        
        if (contactForm) {
          setTimeout(() => {
            contactForm.reset();
          }, 100);
        }
      } else {
        this.hasError = true;
        this.isSubmitted = false;
        this.errorMessage = data.message || 'Something went wrong. Please try again.';
      }
    } catch (error) {
      this.hasError = true;
      this.isSubmitted = false;
      this.errorMessage = 'An unexpected error occurred. Please try again later.';
      console.error('Form submission error:', error);
    } finally {
      this.isSubmitting = false;
    }
  }
}
