import { NgModule } from '@angular/core';
import { FromNowPipe } from './from-now.pipe';

const pipes = [
  FromNowPipe
];

@NgModule({
  declarations: pipes,
  exports: pipes
})
export class CustomPipesModule {}
