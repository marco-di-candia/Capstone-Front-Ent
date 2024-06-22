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
        // Puoi aggiornare l'interfaccia utente o fare altre operazioni dopo l'aggiunta al carrello
      },
      error => {
        console.error('Errore durante l\'aggiunta del prodotto al carrello:', error);
        // Gestisci l'errore, ad esempio mostrando un messaggio all'utente
      }
    );
  }
}
