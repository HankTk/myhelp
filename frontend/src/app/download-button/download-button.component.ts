import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-download-button',
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.css']
})
export class DownloadButtonComponent {
  @Input() lang: string = 'ja';

  get zipUrl() {
    return `http://localhost:8080/api/repository/download-language/${this.lang}`;
  }
}
