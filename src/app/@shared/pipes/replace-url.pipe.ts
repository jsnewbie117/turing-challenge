import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// noinspection TsLint
@Pipe({ name: 'replaceUrl' })
export class ReplaceUrlPipe implements PipeTransform {

  // https://stackoverflow.com/a/17773849/6161572
  private regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/g;

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: string): any {
    return this.sanitizer.bypassSecurityTrustHtml(value.replace(this.regex, '<a href="$&" target="_blank">$&</a>'));
  }
}
