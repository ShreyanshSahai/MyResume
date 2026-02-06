import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  skillCategories: SkillCategory[] = [
    {
      name: 'Backend & Cloud',
      skills: [
        { name: '.NET Core / 8.0', level: 95, icon: 'bi bi-code-square' },
        { name: 'C#', level: 95, icon: 'bi bi-filetype-cs' },
        { name: 'AWS Ecosystem', level: 85, icon: 'bi bi-amazon' },
        { name: 'Microservices', level: 85, icon: 'bi bi-diagram-3-fill' },
        { name: 'API Design (REST)', level: 90, icon: 'bi bi-gear-wide-connected' }
      ],
    },
    {
      name: 'Frontend',
      skills: [
        { name: 'Angular 18+', level: 90, icon: 'bi bi-file-type-html' },
        { name: 'TypeScript', level: 90, icon: 'bi bi-file-code' },
        { name: 'React', level: 75, icon: 'bi bi-atom' },
        { name: 'Next.js', level: 70, icon: 'bi bi-lightning' },
        { name: 'SCSS/Tailwind', level: 85, icon: 'bi bi-palette' },
      ],
    },
    {
      name: 'Database & DevOps',
      skills: [
        { name: 'SQL Server', level: 90, icon: 'bi bi-database-fill' },
        { name: 'PostgreSQL', level: 80, icon: 'bi bi-database' },
        { name: 'Docker', level: 80, icon: 'bi bi-box-seam' },
        { name: 'CI/CD Pipelines', level: 80, icon: 'bi bi-infinity' },
        { name: 'Redis', level: 75, icon: 'bi bi-layers' },
      ],
    },
  ];
}
