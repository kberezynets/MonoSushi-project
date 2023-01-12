import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public hideMenu = true;

  public totalPrice = 0;
  public totalQty = 0;
  public basket: Array<IProductResponse> = [];

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

  showMenu(): void {
    this.hideMenu =!this.hideMenu;
  }

  loadBasket(): void {
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    console.log(this.basket);
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