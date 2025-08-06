import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  standalone: true
})
export class Footer implements OnInit {
  currentYear: number = new Date().getFullYear();

  ngOnInit(): void {
    // Any initialization logic can go here if needed
  }
}
