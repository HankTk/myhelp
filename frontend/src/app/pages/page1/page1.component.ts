import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class Page1Component {
  title = 'Page 1';
} 