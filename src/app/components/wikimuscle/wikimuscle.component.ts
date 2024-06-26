import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-wikimuscle',
  templateUrl: './wikimuscle.component.html',
  styleUrls: ['./wikimuscle.component.css']
})
export class WikimuscleComponent {

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const button = document.getElementById('backToTopBtn');
    if (document.documentElement.scrollTop > 20 || document.body.scrollTop > 20) {
      button!.style.display = 'block';
    } else {
      button!.style.display = 'none';
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollTo(elementId: string) {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
