import { NgModule } from '@angular/core';
import { FromNowPipe } from './from-now.pipe';
import { ReplaceUrlPipe } from './replace-url.pipe';

const pipes = [
  FromNowPipe,
  ReplaceUrlPipe
];

@NgModule({
  declarations: pipes,
  exports: pipes
})
export class CustomPipesModule {}
