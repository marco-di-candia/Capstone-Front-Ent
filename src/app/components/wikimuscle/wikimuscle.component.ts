import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-wikimuscle',
  templateUrl: './wikimuscle.component.html',
  styleUrls: ['./wikimuscle.component.css']
})
export class WikimuscleComponent {
  scrollTo(elementId: string) {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
