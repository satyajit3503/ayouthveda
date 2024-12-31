import { Component } from '@angular/core';
import { CategoriesService } from '../Service/Categories/categories.service';
import { TypesService } from '../Service/type/types.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories: any[] = [];
  types: any[] = [];
  categoryNames: Array<{ name: string }> = [{ name: '' }]; // Array for new categories
  loading: boolean = true;
  error: string | null = null;
  selectedCategoryId: number | null = null;
  selectedTypeIds: number[] = [];
  constructor(private categoriesService: CategoriesService,
    private typeService: TypesService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.loading = true;
    this.error = null;

    this.categoriesService.getCategories().subscribe(
      (response: any) => {
        console.log('API Response:', response); // Debug response structure

        this.categories = response.serviceResponse || [];
        this.loading = false;
      },
      (error: any) => {
        console.error('API Error:', error);
        this.error = 'Failed to load categories.';
        this.loading = false;
      }
    );
  }
  openTypeMappingModal(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.fetchTypes(); // Load types when the modal opens
    this.selectedTypeIds = []; // Clear previous selections
  }

  fetchTypes(): void {
    this.loading = true;
    this.error = null;

    this.typeService.getTypes().subscribe(
      (response: any) => {
        this.types = response.serviceResponse || [];
        this.loading = false;
      },
      (error: any) => {
        console.error('API Error:', error);
        this.error = 'Failed to load types.';
        this.loading = false;
      }
    );
  }

  mapCategoryToTypes(): void {
    if (this.selectedCategoryId && this.selectedTypeIds.length > 0) {
      const payload = {
        categoryId: this.selectedCategoryId,
        typeIds: this.selectedTypeIds
      };

      this.categoriesService.mapCategoryType(payload).subscribe(
        (response: any) => {
          alert('Category successfully mapped to types!');
          this.selectedCategoryId = null;
          this.selectedTypeIds = [];
        },
        (error: any) => {
          console.error('Mapping failed:', error);
          alert('Failed to map category to types.');
        }
      );
    } else {
      alert('Please select at least one type.');
    }
  }
  
  addCategoryField(): void {
    this.categoryNames.push({ name: '' });
  }

  removeCategoryField(index: number): void {
    this.categoryNames.splice(index, 1);
  }

  saveCategories(): void {
    const categoryNames = this.categoryNames
      .map((category) => category.name.trim())
      .filter((name) => name); // Remove empty names

    if (categoryNames.length === 0) {
      alert('Please add at least one valid category.');
      return;
    }

    this.categoriesService.saveCategory(categoryNames).subscribe(
      (response: any) => {
        this.fetchCategories(); // Refresh the categories list
        this.categoryNames = [{ name: '' }]; // Reset the form
      },
      (error: any) => {
        console.error('Failed to save categories:', error);
        alert('Failed to save categories.');
      }
    );
  }




  
}
