import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-help-viewer',
  templateUrl: './help-viewer.component.html',
  styleUrls: ['./help-viewer.component.css']
})
export class HelpViewerComponent 
{

  @Input() page: string = 'dashboard';
  @Input() lang: string = 'ja';

  get helpUrl() 
  {
    return `/help/${this.lang}/${this.page}.html`;
  }

}
