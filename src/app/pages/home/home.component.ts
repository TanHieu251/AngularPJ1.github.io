import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";
import { StoreService } from "src/app/services/store.service";

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: [],
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  category: string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];
  products: Array<Product> | undefined;
  sort = "desc";
  count = "12";
  productSubcription: Subscription | undefined;

  constructor(
    private CartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.storeService
      .getAllProduct((this.count = "12"), this.sort,this.category)
      .subscribe((_product) => {
        this.products = _product;
      });
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.CartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }
  onItemsCountChanges(newCount: number): void {
    this.count = newCount.toString();
    this.getProducts();
  }

  onSortChanges(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }

  ngOnDestroy(): void {
    if (this.productSubcription) {
      this.productSubcription.unsubscribe();
    }
  }
}
