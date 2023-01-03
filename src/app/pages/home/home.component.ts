import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products: Array<IProductResponse> = [];

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

   loadProducts(): void {
    this.productService.getAll().subscribe(data => {
      this.products = data;
    })
  }

}