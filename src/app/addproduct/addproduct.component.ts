import { Component,OnInit } from '@angular/core';
import { AddProductService } from '../Service/addproduct/add-product.service';
import { CategoriesService } from '../Service/Categories/categories.service';
import { TypesService } from '../Service/type/types.service';
import { CareRegimenService } from '../Service/care-regimen/care-regimen.service';
import { CollectionService } from '../Service/Collections/collection.service';
import { IngredientsService } from '../Service/ingredients/ingredients.service';
import { ConcernService } from '../Service/concern/concern.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit{

  categories: any[] = [];
  types: any[] = [];
  // careRegimen: any[] = [];
  // collections: any[] = [];
  // ingredient: any[] = [];
  // concern: any[] = [];
  // upsellItems:any[]=[];
  //bundleSellItems:any[]=[];
  //crossSellItems:any[]=[];
  
  selectedCategoryId: number | null = null;
  selectedIngredients: string[] = [];
  selectedConcerns: string[] = [];
  selectedCareRegimens: string[] = [];
  selectedCollections: string[] = [];
 

  ingredient = [
    { id: '1', ingredientName: 'Ingredient 1' },
    { id: '2', ingredientName: 'Ingredient 2' },
    { id: '3', ingredientName: 'Ingredient 3' }
  ];

  concern = [
    { id: '1', concernName: 'Concern 1' },
    { id: '2', concernName: 'Concern 2' }
  ];

  careRegimen = [
    { id: '1', careRegimenName: 'Regimen 1' },
    { id: '2', careRegimenName: 'Regimen 2' }
  ];

  collections = [
    { id: '1', collectionName: 'Collection 1' },
    { id: '2', collectionName: 'Collection 2' }
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

  productData = {
    title: '',
    description: '',
    shortDescription: '',
    price: null,
    discount: null,
    totalStockQuantity: null,
    netWeight: '',
    status: '',
    publishDate: '',
    bestseller: 0,
    howToUse: '',
    whoCanUse: '',
    composition: '',
    specialContent: '',
    category: '', 
    type: '', 
    upsell: [],  // e.g., [1,2]
    crossSell: [],  // e.g., [1,2]
    bundleSell: [],  // e.g., [1,2]
    Collections: [], // e.g., [1,2]
    ingredients: [], // e.g., [1,2]
    concerns: [],  // e.g., [1,2]
    careRegimen: [], // e.g., [1,2]
    bundleSellTitle: '',
    bundleSellDiscount: null 

  };
  
 
  file1: File | null = null;
  file2: File | null = null;

  constructor(private addProductService: AddProductService,
    private categoriesService: CategoriesService,
    private typeService: TypesService,
    private careRegimenService: CareRegimenService,
    private collectionService: CollectionService,
    private ingredientService: IngredientsService,
    private concernService: ConcernService,

  ) {}

  ngOnInit(): void {
    console.log("started")
    this.fetchCategories();
    this.fetchCareRegimens();
    this.fetchCollection();
    this.fetchConcern();
    this.fetchIngredients();

  }
  fetchCategories(): void {
    this.categoriesService.getCategories().subscribe(
      (response: any) => {
        this.categories = response.serviceResponse || [];
      },
      (error: any) => {
        console.error('API Error:', error);
      }
    );
  }
  
  onCategoryChange(): void {
    if (!this.selectedCategoryId) {
      this.types = [];
      this.productData.category = '';
      return;
    }
    const selectedCategory = this.categories.find(
      (category) => category.id === Number(this.selectedCategoryId)
    );
    if (selectedCategory) {
      this.productData.category = selectedCategory.id;
      this.fetchTypesByCategory(this.selectedCategoryId);
    } else {
      this.productData.category = '';
    }
  }
  fetchTypesByCategory(categoryId: number): void {
    this.typeService.getTypesByCategoryId(categoryId).subscribe(
      (response: any) => {
        
        this.types = response.serviceResponse || [];
      },
      (error: any) => {
        console.error('API Error:', error);
      }
    );
  }

  

fetchIngredients(): void {
  this.ingredientService.getingredients().subscribe(
    (response: any) => {
      this.ingredient = response.serviceResponse || [];
    },
    (error) => console.error('API Error:', error)
  );
}

fetchConcern(): void {
  this.concernService.getConcern().subscribe(
    (response: any) => {
      this.concern = response.serviceResponse || [];
    },
    (error) => console.error('API Error:', error)
  );
}

fetchCareRegimens(): void {
  this.careRegimenService.getcareRegimen().subscribe(
    (response: any) => {
      this.careRegimen = response.serviceResponse || [];
    },
    (error) => console.error('API Error:', error)
  );
}

fetchCollection(): void {
  this.collectionService.getCollections().subscribe(
    (response: any) => {
      this.collections = response.serviceResponse || [];
    },
    (error) => console.error('API Error:', error)
  );
}

toggleSelection(event: any, list: any[], id: any): void {
  if (event.target.checked) {
    if (!list.includes(id)) {
      list.push(id);
    }
  } else {
    const index = list.indexOf(id);
    if (index > -1) {
      list.splice(index, 1);
    }
  }
}



onIngredientSelect(event: any, id: any): void {
  this.toggleSelection(event, this.productData.ingredients, id);
}

onConcernSelect(event: any, id: string): void {
  this.toggleSelection(event,this.productData.concerns, id);
}

onCareRegimenSelect(event: any, id: string): void {
  this.toggleSelection(event, this.productData.careRegimen, id);
}

onCollectionSelect(event: any, id: string): void {
  this.toggleSelection(event, this.productData.Collections, id);
}






  // Capture file inputs
  onFileChange(event: any, fileField: string) {
    const file = event.target.files[0];
    if (fileField === 'file1') {
      this.file1 = file;
    } else if (fileField === 'file2') {
      this.file2 = file;
    }
  }
  toggleBestseller(event: any): void {
    this.productData.bestseller = event.target.checked ? 1 : 0;
  }
 
  onCancel(): void {
    // Reset form or navigate away
    console.log("Cancel button clicked");
  } 
  onSubmit() {
    // List of mandatory fields with their respective error messages
    const mandatoryFields = [
      { field: this.productData.title, name: 'Title' },
      { field: this.productData.shortDescription, name: 'Short Description' },
      { field: this.productData.description, name: 'Description' },
      { field: this.productData.category, name: 'Category' },
      { field: this.productData.type, name: 'Type' },
      { field: this.productData.price, name: 'Price' },
      { field: this.productData.discount, name: 'Discount' },
      { field: this.productData.totalStockQuantity, name: 'Stock Quantity' },
      { field: this.productData.netWeight, name: 'Weight' },
      { field: this.productData.status, name: 'Status' },
      { field: this.productData.ingredients, name: 'Ingredients' },
      { field: this.productData.concerns, name: 'Concerns' },
      { field: this.productData.careRegimen, name: 'Care Regimens' },
      { field: this.productData.Collections, name: 'Collections' },
      { field: this.productData.howToUse, name: 'How to Use' },
      { field: this.productData.whoCanUse, name: 'Who Can Use' },
      { field: this.productData.composition, name: 'Composition' },
      { field: this.file1, name: 'Image 1' },
      { field: this.file2, name: 'Image 2' },
    ];
  
    // Additional validation for conditional fields
    if (this.productData.status === 'scheduled') {
      mandatoryFields.push({ field: this.productData.publishDate, name: 'Publish Date' });
    }
  
    // Check for empty or null fields
    for (const item of mandatoryFields) {
      if (!item.field || item.field === '' || (Array.isArray(item.field) && item.field.length === 0)) {
        alert(`Please fill out the mandatory field: ${item.name}`);
        return; 
      }
    }

    console.log('Form submitted successfully:', this.productData);
    // Add your submission logic here, e.g., calling a service to save the data
  }
  
}
