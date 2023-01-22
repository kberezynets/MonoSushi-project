import { Component } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  public totalPrice = 0;
  public totalQty = 0;
  public basket: Array<IProductResponse> = [];

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

  loadBasket(): void {
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotal();
  }

  getTotal(): void {
    this.totalPrice = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0);
      this.totalQty = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count, 0);
  }

  productCount(product: IProductResponse, value: boolean): void {
    if(value){
      ++product.count;
    } else if(!value && product.count > 1){
      --product.count;
    }
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

}
