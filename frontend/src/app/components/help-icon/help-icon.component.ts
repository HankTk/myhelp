import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';

@Component({
  selector: 'app-help-icon',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <button mat-icon-button (click)="openHelpDialog()" class="help-button">
      <mat-icon>help_outline</mat-icon>
    </button>
  `,
  styles: [`
    .help-button {
      position: fixed;
      top: 8px;
      right: 64px;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .help-button mat-icon {
      color: white;
    }
  `]
})
export class HelpIconComponent {
  @Input() helpContent: string = '';

  constructor(private dialog: MatDialog) {}

  openHelpDialog(): void {
    this.dialog.open(HelpDialogComponent, {
      width: '500px',
      data: { content: this.helpContent }
    });
  }
} 