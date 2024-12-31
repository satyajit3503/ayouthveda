import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../Service/seller/seller.service';
import { ProductsService } from '../Service/Products/products.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})
export class SellerComponent {
  Allsellers: any[] = [];
  products: any[] = [];
  selectedSeller: any = null;
  loading: boolean = true;
  error: string | null = null;
  searchProduct: string = '';

  seller = {
    name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
  };

  constructor(private sellerService: SellerService,
    private productsService: ProductsService,
  ) {}
  ngOnInit(): void {
    this.fetchSellers();
    this.fetchproducts();

  }

  fetchSellers(): void {
    this.loading = true;
    this.error = null;

    this.sellerService.getSeller().subscribe(
      (response: any) => {

        this.Allsellers = response.serviceResponse || [];
        this.loading = false;
      },
      (error: any) => {
        console.error('API Error:', error);
        this.error = 'Failed to load Sellers.';
        this.loading = false;
      }
    );
  }

  addSeller() {
    this.sellerService.saveSellerUser(this.seller).subscribe({
      next: (response) => {
        alert('Seller added successfully!');
        this.seller = { name: '', username: '', email: '', password: '', phone: '' };
      },
      error: (error) => {
        alert('Failed to add seller.');
      },
    });
  }


  fetchproducts(): void {
    this.loading = true;
    this.error = null;

    this.productsService.getproducts().subscribe(
      (response: any) => {
        this.products = response.serviceResponse || [];
        this.loading = false;
      },
      (error: any) => {
        console.error('API Error:', error);
        this.error = 'Failed to load products.';
        this.loading = false;
      }
    );
  }
  setSelectedSeller(seller: any): void {
    this.selectedSeller = seller;
  }
  filteredProducts(): any[] {
    if (!this.searchProduct) {
      return this.products; // Return all products if there's no search query
    }
  
    return this.products.filter((product) =>
      product.title.toLowerCase().includes(this.searchProduct.toLowerCase())
    );
  }
  
  
}
