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
export class Header implements AfterViewInit, OnInit {
  @ViewChild('titleElement') titleElement!: ElementRef;

  private titleTyped!: Typed;
  experienceString: string = '';

  ngOnInit() {
    this.calculateExperience();
  }

  ngAfterViewInit() {
    this.titleTyped = new Typed(this.titleElement.nativeElement, {
      strings: [
        'Backend Focused',
        'AWS Cloud Architect',
        'Angular Expert',
        'API Designer'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      smartBackspace: true
    });
  }

  calculateExperience() {
    const startDate = new Date('2022-06-01');
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    this.experienceString = `${years} Years ${months} Months`;
  }
}
