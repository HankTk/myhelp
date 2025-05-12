import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageContextService 
{

  private currentPageSubject = new BehaviorSubject<string>('welcome');
  currentPage$ = this.currentPageSubject.asObservable();

  setCurrentPage(pageId: string) 
  {
    this.currentPageSubject.next(pageId);
  }

  getCurrentPage(): string 
  {
    return this.currentPageSubject.value;
  }

} 