import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeMode } from '../../shared/services/theme.service';
import { Subscription } from 'rxjs';

interface EducationItem {
  degree: string;
  major?: string;
  institution: string;
  location?: string;
  score: string;
  scoreLabel: string;
  imageName: string;
  lightImageName?: string;
  year?: string;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class Education implements OnInit, OnDestroy {
  currentTheme: ThemeMode = 'light';
  private themeSubscription: Subscription | null = null;

  constructor(private themeService: ThemeService) {}
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

  getImagePath(item: EducationItem): string {
    if (item.lightImageName && this.currentTheme === 'light') {
      return item.lightImageName;
    }
    return item.imageName;
  }

  educationList: EducationItem[] = [
    {
      degree: 'Bachelor of Technology',
      major: 'Computer Engineering',
      institution: 'ABES Engineering College, Ghaziabad',
      location: 'Affiliated to APJ Abdul kalam technical university',
      score: '8.5',
      scoreLabel: 'CGPA',
      imageName: 'abes.png',
    },
    {
      degree: 'Grade 12',
      institution: 'City Montessori School, Lucknow',
      score: '95.25%',
      scoreLabel: 'Percentage',
      imageName: 'cms.png',
      lightImageName: 'cms-light.png',
    },
    {
      degree: 'Grade 10',
      institution: 'City Montessori School, Lucknow',
      score: '88.96%',
      scoreLabel: 'Percentage',
      imageName: 'cms.png',
      lightImageName: 'cms-light.png',
    },
  ];
}
