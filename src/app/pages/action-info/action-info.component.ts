import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActionResponse } from 'src/app/shared/interfaces/action/action.interface';
import { ActionService } from 'src/app/shared/services/action/action.service';

@Component({
  selector: 'app-action-info',
  templateUrl: './action-info.component.html',
  styleUrls: ['./action-info.component.scss']
})
export class ActionInfoComponent implements OnInit {

  public action!: IActionResponse;
  public descriptionItems!: Array<string>;
  public bullet = '\u{2022}';

  constructor(
    private actionService: ActionService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.action = response['actionInfo'];
      this.descriptionItems = this.action.description.split(". ");
    })
  }

  // getOneAction(): void {
  //   const ACTION_ID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  //   this.actionService.getOne(ACTION_ID).subscribe(data => {
  //     this.action = data;
  //     this.descriptionItems = this.action.description.split(". ");
  //   })
  // }
}

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
// import { OrderService } from 'src/app/shared/services/order/order.service';
// import { ProductService } from 'src/app/shared/services/product/product.service';

// @Component({
//   selector: 'app-product-info',
//   templateUrl: './product-info.component.html',
//   styleUrls: ['./product-info.component.scss']
// })

// export class ProductInfoComponent implements OnInit{

//   public bullet = '\u{2022}';
//   public currentProduct!: IProductResponse;

//   constructor(
//     private productService: ProductService,
//     private activatedRoute: ActivatedRoute,
//     private orderService: OrderService
//   ) { }

//   ngOnInit(): void {
//     this.activatedRoute.data.subscribe(response => {
//       this.currentProduct = response['productInfo'];
//     })
//   }


// }