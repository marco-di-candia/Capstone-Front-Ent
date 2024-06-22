export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    categoria: any;
  }
  
  export interface CartItem extends Product {
    amount: number;
    totalPrice: number;
  }
  