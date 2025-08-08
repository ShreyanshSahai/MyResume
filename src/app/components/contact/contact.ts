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
  
  // Form model
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  // Form states
  isSubmitting = false;
  isSubmitted = false;
  hasError = false;
  errorMessage = '';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.theme$.subscribe(
      (theme: ThemeMode) => {
        this.currentTheme = theme;
      }
    );

    // Initialize animations when component loads
    this.initializeAnimations();
  }

  ngOnDestroy() {
    // Clean up subscription when component is destroyed
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  private initializeAnimations() {
    // Add animation to form elements with a staggered delay
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
    
    // Get the form element to reset its state later
    const contactForm = document.querySelector('form') as HTMLFormElement;
    
    try {
      const formData = new FormData();
      
      // Add form fields
      formData.append('name', this.formData.name);
      formData.append('email', this.formData.email);
      formData.append('subject', this.formData.subject);
      formData.append('message', this.formData.message);
      
      // Add access key
      formData.append('access_key', environment.web3FormsAccessKey);
      
      // Send to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Reset form on success
        this.formData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
        this.isSubmitted = true;
        this.hasError = false; // Ensure error is hidden when submission is successful
        
        // Reset the form's submitted state to clear validation errors
        if (contactForm) {
          // Use ViewChild to access the form and reset it properly
          setTimeout(() => {
            // This resets the native form element without affecting our model
            contactForm.reset();
          }, 100); // Small delay to ensure DOM updates
        }
      } else {
        this.hasError = true;
        this.isSubmitted = false; // Ensure success message is hidden when there's an error
        this.errorMessage = data.message || 'Something went wrong. Please try again.';
      }
    } catch (error) {
      this.hasError = true;
      this.isSubmitted = false; // Ensure success message is hidden when there's an error
      this.errorMessage = 'An unexpected error occurred. Please try again later.';
      console.error('Form submission error:', error);
    } finally {
      this.isSubmitting = false;
    }
  }
}
