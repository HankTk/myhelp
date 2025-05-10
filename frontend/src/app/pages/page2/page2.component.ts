import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class Page2Component {
  title = 'Page 2';
} 