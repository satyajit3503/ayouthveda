import { Component } from '@angular/core';
import { IngredientsService } from '../Service/ingredients/ingredients.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent {
  ingredient: any[] = [];
  newIngredients: { name: string; file: File | null }[] = [{ name: '', file: null }];
  loading: boolean = true;
  error: string | null = null;

  constructor(private ingredientService: IngredientsService) {}

  ngOnInit(): void {
    this.fetchIngredients();
  }

  fetchIngredients(): void {
    this.loading = true;
    this.error = null;

    this.ingredientService.getingredients().subscribe(
      (response: any) => {
        this.ingredient = response.serviceResponse || [];
        this.loading = false;
      },
      (error: any) => {
        console.error('API Error:', error);
        this.error = 'Failed to load ingredients.';
        this.loading = false;
      }
    );
  }

  addIngredient(): void {
    this.newIngredients.push({ name: '', file: null });
  }

  removeIngredient(index: number): void {
    this.newIngredients.splice(index, 1);
  }

  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.newIngredients[index].file = file;
    }
  }

  saveIngredients(): void {
    const formData = new FormData();
    this.newIngredients.forEach((ingredient, index) => {
      formData.append(`collections[${index}].name`, ingredient.name);
      if (ingredient.file) {
        formData.append(`collections[${index}].file`, ingredient.file);
      }
    });

    this.ingredientService.saveingredients(formData).subscribe(
      (response) => {
        console.log('Success:', response);
        this.newIngredients = [{ name: '', file: null }];
        this.fetchIngredients();
      },
      (error) => {
        console.error('Error:', error);
        this.error = 'Failed to save ingredients.';
      }
    );
  }
}
