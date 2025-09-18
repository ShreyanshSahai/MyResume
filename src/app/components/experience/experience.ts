import {
  Component,
  ElementRef,
  HostListener,
  AfterViewInit,
  ViewChildren,
  QueryList,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeMode } from '../../shared/services/theme.service';
import { Subscription } from 'rxjs';

interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  logoPath: string;
  lightLogoPath?: string;
  achievements: string[];
}

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience implements AfterViewInit, OnInit, OnDestroy {
  currentTheme: ThemeMode = 'light';
  private themeSubscription: Subscription | null = null;
  @ViewChildren('experienceCard') experienceCards!: QueryList<ElementRef>;

  experiences: ExperienceItem[] = [
    {
      company: 'Particle41',
      position: 'Full Stack Developer',
      duration: 'June 2024 - Present',
      logoPath: '/images/particle41.png',
      achievements: [
        'Upgraded legacy codebase from Repository Pattern to Clean Architecture, reducing technical debt and improving testability and scalability.',
        'Reduced codebase size by 20% through refactoring, eliminating redundancies, and applying SOLID principles.',
        'Collaborated with cross-functional teams to design and implement RESTful APIs using ASP.NET Core 8.0 with JWT authentication.',
        'Integrated Twilio and SendGrid APIs for secure OTP-based login systems and email communication features.',
        'Implemented asynchronous programming patterns to enhance API responsiveness and reduce latency by over 30%.',
        'Actively contributed to architectural discussions and decisions, advocating for Domain-Driven Design (DDD) and Dependency Injection practices.',
      ],
    },
    {
      company: 'Koenig Solutions Pvt Ltd',
      position: '.NET Full Stack Developer',
      duration: 'September 2022 - June 2024',
      logoPath: '/images/koenig.png',
      lightLogoPath: '/images/koenig-light.png',
      achievements: [
        'Developed and implemented web pages using AJAX and JQuery, reducing page load time by 60% from 7 seconds to 3 seconds. This enhanced client interaction, increased website traffic, and significantly improved user experience.',
        "Successfully implemented a video search feature on our company's website, overcoming various challenges. This enhancement boosted client interaction and contributed to a 2% increase in business.",
        'Designed and implemented an automated email reading system for customer support, effectively sharing relevant emails with the appropriate teams. This reduced missed important emails and enhanced client satisfaction by 40%.',
        'Implemented auto-login using Google OAuth 2.0, cutting login time by 50%. This improvement encouraged students to log in more frequently, enhancing website engagement.',
      ],
    },
    {
      company: 'Koenig Solutions Pvt Ltd',
      position: '.NET Developer Trainee',
      duration: 'June 2022 - August 2022',
      logoPath: '/images/koenig.png',
      lightLogoPath: '/images/koenig-light.png',
      achievements: [
        'Developed a hotel management application using C#, .NET MVC, MSSQL, Bootstrap, cshtml, AJAX, and JQuery, following Agile methodology.',
        'Implemented distinct roles for admin, employees, and users, allowing admin to manage rooms and employees, while employees handle room occupancy and user booking requests.',
      ],
    },
  ];

  constructor(
    private elementRef: ElementRef,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeSubscription = this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  getLogoPath(experience: ExperienceItem): string {
    if (experience.lightLogoPath && this.currentTheme === 'light') {
      return experience.lightLogoPath;
    }
    return experience.logoPath;
  }

  ngAfterViewInit() {
    this.initTiltEffect();
    this.setupScrollAnimation();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.experienceCards.forEach((cardRef) => {
      const card = cardRef.nativeElement;
      const rect = card.getBoundingClientRect();

      if (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      ) {
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        const rotationY =
          ((event.clientX - cardCenterX) / (rect.width / 2)) * 5;
        const rotationX =
          ((cardCenterY - event.clientY) / (rect.height / 2)) * 5;

        card.style.setProperty('--rotation-x', `${rotationX}deg`);
        card.style.setProperty('--rotation-y', `${rotationY}deg`);
      }
    });
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.experienceCards.forEach((cardRef) => {
      const card = cardRef.nativeElement;
      card.style.setProperty('--rotation-x', '0deg');
      card.style.setProperty('--rotation-y', '0deg');
    });
  }

  private initTiltEffect() {
    this.experienceCards.forEach((cardRef) => {
      const card = cardRef.nativeElement;
      card.style.setProperty('--rotation-x', '0deg');
      card.style.setProperty('--rotation-y', '0deg');
    });
  }

  private setupScrollAnimation() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    this.experienceCards.forEach((cardRef) => {
      observer.observe(cardRef.nativeElement);
    });
  }
}
