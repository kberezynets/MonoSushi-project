import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  public addStatus = false;
  public adminCategories: Array<ICategoryResponse> = [];
  public adminProducts: Array<IProductResponse> = [];
  public productForm!: FormGroup;
  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  private currentProductId = 0;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private imageService: ImageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
    this.initProductForm();
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      ingridients: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null],
      count: [1]
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;
      this.productForm.patchValue({
        category: this.adminCategories[0]
      })
    })
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(data => {
      this.adminProducts = data;
    })
  }

  addProduct(): void {
    this.addStatus = !this.addStatus;
    this.productForm.reset();
    this.productForm.patchValue({
      category: this.adminCategories[0],
      count: 1
    })
  }

  saveProduct(): void {
    if (this.editStatus) {
      this.productService.update(this.productForm.value, this.currentProductId).subscribe(() => {
        this.loadProducts();
        this.toastr.success('Product successfully updated');
      })
    } else {
      this.productService.create(this.productForm.value).subscribe(() => {
        this.loadProducts();
        this.toastr.success('Product successfully added');
      })
    }
    this.productForm.reset();
    this.addStatus = false;
    this.editStatus = false;
    this.uploadPercent = 0;
    this.isUploaded = false;
  }

  editProduct(product: IProductResponse): void {
    this.addStatus = true;
    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      ingridients: product.ingridients,
      weight: product.weight,
      price: product.price,
      imagePath: product.imagePath,
    });
    this.isUploaded = true;
    this.editStatus = true;
    this.currentProductId = product.id;
  }

  deleteProduct(product: IProductResponse): void {
    this.productService.delete(product.id).subscribe(() => {
      this.loadProducts();
      this.toastr.success('Product successfully deleted');
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.productForm.patchValue({ imagePath: null })
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }

}