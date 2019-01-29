import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DemoComponent } from './demo/demo.component';
import { KnobComponentDirective } from './lib/knob.directive';

@NgModule({
  declarations: [
    DemoComponent,
    KnobComponentDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [DemoComponent]
})
export class AppModule { }
