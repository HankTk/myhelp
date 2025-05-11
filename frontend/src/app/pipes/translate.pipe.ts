import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private languageService: LanguageService) {}

  transform(key: string): Observable<string> {
    if (!key) {
      return of('');
    }
    return this.languageService.translate(key).pipe(
      catchError(error => {
        console.error(`Translation error for key ${key}:`, error);
        return of(key);
      })
    );
  }
} 