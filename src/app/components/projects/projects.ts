import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: string;
  name: string;
  description: string;
  websiteLink: string;
  imageCount: number;
  folderName: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('projectItem') projectElements!: QueryList<ElementRef>;

  projects: Project[] = [
    {
      id: 'toursgpt',
      name: 'ToursGPT',
      description:
        'Tours GPT: Discover top attractions and hidden gems in any city. Simply enter a city name to receive personalized recommendations, user reviews, and essential information to enhance your travel experience. Plan your next adventure effortlessly with City Explorer!',
      websiteLink: 'https://toursgpt-ten.vercel.app/',
      imageCount: 5,
      folderName: 'project1',
    },
    {
      id: 'moviesimp',
      name: 'MovieSIMP',
      description:
        "MovieSIMP is your modern hub for exploring what's trending in movies—quickly and easily. Browse top films, check out concise overviews, genres, and release dates, and discover similar titles to expand your watchlist.",
      websiteLink: 'https://movie-simp.vercel.app/',
      imageCount: 4,
      folderName: 'project2',
    },
    {
      id: 'ayushi-kitchen',
      name: "Ayushi's Indian Kitchen",
      description:
        "Ayushi's Indian Kitchen is a vibrant and user-friendly online platform designed for local food lovers to conveniently order delicious Indian cuisine. With an inviting interface, customers can easily explore featured dishes, browse the menu by categories like bread, rice, snacks, or meals, and enjoy special offers on bestsellers such as Butter Chicken and Biryani.",
      websiteLink: 'https://ayushi-indian-kitchen.vercel.app/',
      imageCount: 4,
      folderName: 'project3',
    },
  ];

  currentImageIndex: { [key: string]: number } = {};
  private autoplayIntervals: { [key: string]: any } = {};
  private observers: IntersectionObserver[] = [];
  projectVisibility: { [key: string]: boolean } = {};

  constructor() {
    // Initialize all projects to show their first image
    this.projects.forEach((project) => {
      this.currentImageIndex[project.id] = 0;
      this.projectVisibility[project.id] = false;
    });
  }

  ngOnInit(): void {
    // We'll set up observers in ngAfterViewInit instead
  }

  ngAfterViewInit(): void {
    // Wait for the view to be fully initialized
    setTimeout(() => {
      this.setupIntersectionObservers();
    }, 100);
  }

  ngOnDestroy(): void {
    // Clear all intervals when component is destroyed
    Object.values(this.autoplayIntervals).forEach((interval) => {
      clearInterval(interval);
    });

    // Disconnect all observers
    this.observers.forEach((observer) => {
      observer.disconnect();
    });
  }

  setupIntersectionObservers(): void {
    // Get all project elements
    this.projectElements.forEach((elementRef, index) => {
      const projectId = this.projects[index].id;
      const imageCount = this.projects[index].imageCount;

      // Create a new IntersectionObserver for each project
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Update visibility state
            this.projectVisibility[projectId] = entry.isIntersecting;

            // Start or stop autoplay based on visibility
            if (entry.isIntersecting) {
              this.startAutoplay(projectId, imageCount);
            } else {
              this.stopAutoplay(projectId);
            }
          });
        },
        { threshold: 0.4 } // Element is considered visible when 40% is in viewport
      );

      // Start observing the project element
      observer.observe(elementRef.nativeElement);

      // Store the observer for cleanup
      this.observers.push(observer);
    });
  }

  startAutoplay(projectId: string, imageCount: number): void {
    // Clear any existing interval
    this.stopAutoplay(projectId);

    // Set new interval for autoplay (3 seconds)
    this.autoplayIntervals[projectId] = setInterval(() => {
      this.nextImage(projectId, imageCount);
    }, 3000);
  }

  stopAutoplay(projectId: string): void {
    if (this.autoplayIntervals[projectId]) {
      clearInterval(this.autoplayIntervals[projectId]);
      this.autoplayIntervals[projectId] = null;
    }
  }

  nextImage(projectId: string, imageCount: number): void {
    this.currentImageIndex[projectId] =
      (this.currentImageIndex[projectId] + 1) % imageCount;
  }

  prevImage(projectId: string, imageCount: number): void {
    this.currentImageIndex[projectId] =
      (this.currentImageIndex[projectId] - 1 + imageCount) % imageCount;
  }

  getImagePath(folderName: string, index: number): string {
    return `/images/${folderName}/${index + 1}.png`;
  }
}
