import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
  styles: [],
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChanges = new EventEmitter<number>();
  @Output() sortChanges = new EventEmitter<string>();
  sort = "desc";
  itemShowCound = 12;

  constructor() {}

  ngOnInit(): void {}
  onSortUpdate(newSort: string): void {
    this.sort = newSort;
    this.sortChanges.emit(newSort);
  }

  onItemsUpdate(count: number): void {
    this.itemShowCound = count;
    this.itemsCountChanges.emit(count);
  }

  onColumnsUpdate(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }
}
