import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe, AsyncPipe]
})
export class Page2Component {} 