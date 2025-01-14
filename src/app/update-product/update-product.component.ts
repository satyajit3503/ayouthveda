import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../Service/Products/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  productId: number | null = null;
  selectedProduct: any = null;
  productData: any = null;
  
  categories: any[] = [
    { id: 1, name: "Skin Care" },
    { id: 2, name: "Beverages" },
    { id: 4, name: "face" }
  ];
  
  types: any[] = [
    { id: 1, typeName: "Herbal Tea" },
    { id: 2, typeName: "Face Mask" },
    { id: 4, typeName: "face cream" }
  ];
  
  ingredient = [
    { id: '1', ingredientName: 'Mangosteen' },
    { id: '2', ingredientName: 'Coconut' },
    { id: '3', ingredientName: 'Ingredient 3' }
  ];

  concern = [
    { id: '1', concernName: 'Oral Care' },
    { id: '2', concernName: 'Oily Skin' }
  ];

  careRegimen = [
    { id: '1', careRegimenName: 'Ageing skin' },
    { id: '2', careRegimenName: 'Skin Detox Regime' }
  ];

  collections = [
    { id: '1', collectionName: 'Acne' },
    { id: '2', collectionName: 'Hemp' }
  ];
  upsellItems = [
    { id: 1, name: 'Up Sell 1' },
    { id: 2, name: 'Up Sell 2' }
  ];
  
  crossSellItems = [
    { id: 1, name: 'Cross Sell 1' },
    { id: 2, name: 'Cross Sell 2' }
  ];
  
  bundleSellItems = [
    { id: 1, name: 'Bundle Sell 1' },
    { id: 2, name: 'Bundle Sell 2' }
  ];

  constructor(private route: ActivatedRoute, private productService: ProductsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.productId = +id; // Convert to number
        this.loadProductDetails(this.productId); // Load product details for editing
      }
    });
  }

  loadProductDetails(productId: number): void {
    this.productService.getProductDetailById(productId).subscribe(
      (product) => {
        this.productData = product;
        console.log('Product details loaded:', this.productData);
      },
      (error) => {
        console.error('Error loading product details:', error);
      }
    );
  }

  onSubmit(){
    // this.productService.updateProduct(this.selectedProduct).subscribe(
    //   (response) => {
    //     console.log('Product updated successfully:', response);
    //     this.loadProductDetails(this.productId);  
    //     },
    //     (error) => {
    //       console.error('Error updating product:', error);
    //       }
    //       );
  }
  onCategoryChange(): void {
    // if (!this.selectedCategoryId) {
    //   this.types = [];
    //   this.productData.category = '';
    //   return;
    // }
    // const selectedCategory = this.categories.find(
    //   (category) => category.id === Number(this.selectedCategoryId)
    // );
    // if (selectedCategory) {
    //   this.productData.category = selectedCategory.id;
    //   this.fetchTypesByCategory(this.selectedCategoryId);
    // } else {
    //   this.productData.category = '';
    // }
  }
  toggleSelection(event: Event, list: any[], value: any): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      if (!list.includes(value)) {
        list.push(value);
      }
    } else {
      const index = list.indexOf(value);
      if (index > -1) {
        list.splice(index, 1);
      }
    }
  }
  
  
  onCancel(){
    // this.router.navigate(['/products']);
    console.log("cancel click")
  }
}
