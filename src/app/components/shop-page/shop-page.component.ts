import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/produt-service.service';
import { Product,CartItem } from 'src/app/interfaces/Product ';
@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent implements OnInit {
  arrayProduct: Product[] = [];
  cartTotal: number = 0;
  buttonTexts: { [key: number]: string } = {}; // Oggetto per memorizzare il testo del pulsante per ogni prodotto
  buttonClasses: { [key: number]: string } = {}; // Oggetto per memorizzare le classi del pulsante per ogni prodotto
  private timers: { [key: number]: any } = {}; // Oggetto per memorizzare i timer per ogni prodotto

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.subscribeToCartTotal();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.arrayProduct = response;
        console.log('Dati ricevuti:', this.arrayProduct);

        // Inizializza il testo del pulsante e le classi per ogni prodotto
        this.arrayProduct.forEach(product => {
          this.buttonTexts[product.id] = 'Aggiungi al Carrello';
          this.buttonClasses[product.id] = 'btn btn-primary bg-butt';
        });
      },
      error => {
        console.error('Errore durante il recupero dei prodotti:', error);
        // Gestisci l'errore, ad esempio mostrando un messaggio all'utente
      }
    );
  }

  subscribeToCartTotal(): void {
    this.productService.getCartTotal().subscribe(
      total => {
        this.cartTotal = total;
      },
      error => {
        console.error('Errore durante il recupero del totale del carrello:', error);
        // Gestisci l'errore, ad esempio mostrando un messaggio all'utente
      }
    );
  }

  addToCart(product: Product): void {
    this.productService.addToCart(product).subscribe(
      (response: CartItem[]) => {
        console.log('Prodotto aggiunto al carrello:', product);
        this.buttonTexts[product.id] = 'Aggiunto al Carrello'; // Cambia il testo del pulsante per il prodotto aggiunto
        this.buttonClasses[product.id] = 'btn btn-success'; // Cambia il colore del pulsante per il prodotto aggiunto
        this.setResetTimer(product.id); // Avvia il timer per ripristinare il testo e il colore del pulsante
      },
      error => {
        console.error('Errore durante l\'aggiunta del prodotto al carrello:', error);
        // Gestisci l'errore, ad esempio mostrando un messaggio all'utente
      }
    );
  }

  setResetTimer(productId: number): void {
    if (this.timers[productId]) {
      clearTimeout(this.timers[productId]); // Resetta il timer se già attivo per il prodotto
    }
    this.timers[productId] = setTimeout(() => {
      this.resetButton(productId); // Ripristina il testo e il colore del pulsante dopo 5 secondi
    }, 5000); // Tempo in millisecondi (5 secondi)
  }

  resetButton(productId: number): void {
    this.buttonTexts[productId] = 'Aggiungi al Carrello'; // Ripristina il testo del pulsante per il prodotto specificato
    this.buttonClasses[productId] = 'btn btn-primary bg-butt'; // Ripristina il colore del pulsante per il prodotto specificato
  }
}
