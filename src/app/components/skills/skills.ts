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
      name: 'Frontend Development',
      skills: [
        { name: '.Net MVC', level: 80, icon: 'bi bi-diagram-3' },
        { name: '.Net Web Forms', level: 80, icon: 'bi bi-diagram-3' },
        { name: 'JavaScript', level: 80, icon: 'bi bi-journal-code' },
        { name: 'React JS', level: 75, icon: 'bi bi-code-square' },
        { name: 'Next JS', level: 75, icon: 'bi bi-lightning-charge' },
      ],
    },
    {
      name: 'Backend Development',
      skills: [
        { name: '.Net Core', level: 85, icon: 'bi bi-file-earmark' },
        { name: 'MS SQL', level: 85, icon: 'bi bi-database' },
        { name: 'C#', level: 85, icon: 'bi bi-filetype-cs' },
        { name: 'Java', level: 55, icon: 'bi bi-cup-hot' },
        { name: 'JavaScript', level: 55, icon: 'bi bi-filetype-js' },
      ],
    },
    {
      name: 'Tools & Others',
      skills: [
        { name: 'Git', level: 88, icon: 'bi bi-git' },
        { name: 'Clean Code Architecture', level: 90, icon: 'bi bi-cloud' },
        { name: 'Repository Methods', level: 85, icon: 'bi bi-folder-fill' },
        { name: 'Agile', level: 85, icon: 'bi bi-kanban' },
        { name: 'Scrum', level: 80, icon: 'bi bi-kanban' },
      ],
    },
  ];
}
