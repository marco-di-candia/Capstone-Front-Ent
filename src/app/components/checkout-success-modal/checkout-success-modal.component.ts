import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-checkout-success-modal',
  templateUrl: './checkout-success-modal.component.html',
  styleUrls: ['./checkout-success-modal.component.css']
})
export class CheckoutSuccessModalComponent {
  constructor(private router: Router) { }

  ngOnInit(): void {
    // Esempio di azioni aggiuntive all'avvio del componente, se necessario
  }

  // Esempio di metodo per navigare ad un'altra pagina, ad esempio la homepage
  navigateToHome() {
    this.router.navigate(['/']); // Naviga alla homepage, sostituire con la route desiderata
  }
}
