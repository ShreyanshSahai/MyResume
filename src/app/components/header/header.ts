import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Typed from 'typed.js';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class Header implements AfterViewInit {
  @ViewChild('titleElement') titleElement!: ElementRef;
  
  private titleTyped!: Typed;
  
  ngAfterViewInit() {
    // Initialize typing effect for title only
    this.titleTyped = new Typed(this.titleElement.nativeElement, {
      strings: ['Full Stack Engineer'],
      typeSpeed: 60,
      backSpeed: 0,
      showCursor: true,
      cursorChar: '|',
      loop: false,
      startDelay: 300
    });
  }
  
  downloadCV() {
    // TODO: Implement CV download functionality
    console.log('Downloading CV...');
  }
}
