import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page1',
  template: `
    <div class="page-container">
      <h1>{{ title }}</h1>
      <p>This is Page 1 content.</p>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 20px;
    }
    h1 {
      color: #333;
      margin-bottom: 20px;
    }
  `],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class Page1Component {
  title = 'Page 1';
} 