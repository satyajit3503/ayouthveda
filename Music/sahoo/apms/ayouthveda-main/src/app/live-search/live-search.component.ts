import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ProductsService } from '../Service/Products/products.service';

@Component({
  selector: 'app-live-search',
  templateUrl: './live-search.component.html',
  styleUrls: ['./live-search.component.css']
})
export class LiveSearchComponent implements OnInit {
  @Input() placeholder: string = '';
  @Output() onChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  wordEntered: string = '';
  filteredData: any[] = [];
  selectedValues: any[] = [];
  products: any[] = [];
  loading: boolean = false;
  error: string | null = null;

  // Inject ProductsService in the constructor
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.fetchProducts(); // Fetch products on component initialization
  }

  fetchProducts(): void {
    this.loading = true;
    this.error = null;

    this.productsService.getproducts().subscribe(
      (response: any) => {
        this.products = response.serviceResponse || []; // Assuming serviceResponse contains the products
        this.loading = false;
      },
      (error: any) => {
        console.error('API Error:', error);
        this.error = 'Failed to load products.';
        this.loading = false;
      }
    );
  }

  handleFilter(event: any): void {
    const searchWord = event.target.value;
    this.wordEntered = searchWord;
    const newFilter = this.products.filter(value =>
      value.title && value.title.toLowerCase().includes(searchWord.toLowerCase()) &&
      !this.selectedValues.some(selected => selected.title === value.title)
    );

    this.filteredData = searchWord ? newFilter : [];
  }

  handleSelect(value: any): void {
    this.selectedValues.push(value);
    this.wordEntered = ''; // Clear input
    this.filteredData = []; // Clear filtered data
    this.emitChange();
  }

  handleRemove(index: number): void {
    this.selectedValues.splice(index, 1);
    this.emitChange();
  }

  emitChange(): void {
    this.onChange.emit(this.selectedValues);
  }
}
