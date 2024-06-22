import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/service/produt-service.service';
import { ShopDTO } from 'src/app/interfaces/Shop.DTO';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {
  shopList: ShopDTO[] = [];
  cartTotal: number = 0;
  private cartTotalSubscription: Subscription = new Subscription();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getShopList();
    this.productService.updateCartTotal(); // Fetch the total price on initialization
    this.cartTotalSubscription = this.productService.cartTotal$.subscribe(total => {
      this.cartTotal = total;
    });
  }

  ngOnDestroy(): void {
    this.cartTotalSubscription.unsubscribe();
  }

  getShopList(): void {
    this.productService.getAllShops().subscribe(
      (shops: ShopDTO[]) => {
        this.shopList = shops;
      },
      error => {
        console.error('Errore durante il recupero degli shop:', error);
      }
    );
  }

  deleteShop(id: number): void {
    if (id !== undefined && id !== null) {
      console.log('ID dello shop da eliminare:', id);
      this.productService.deleteShop(id).subscribe(
        () => {
          console.log('Negozio eliminato con successo.');
          this.getShopList();
          this.productService.updateCartTotal(); // Update total price after deletion
        },
        error => {
          console.error('Errore durante l\'eliminazione dello shop:', error);
        }
      );
    } else {
      console.error('ID dello shop non valido:', id);
    }
  }

  onDeleteClick(id: number): void {
    if (id !== undefined) {
      console.log('ID dello shop:', id);
      this.deleteShop(id);
    } else {
      console.error('ID dello shop non definito.');
    }
  }
}
