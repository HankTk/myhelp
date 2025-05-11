import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe, AsyncPipe]
})
export class Page1Component {} 