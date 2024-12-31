import { Component } from '@angular/core';
import { TypesService } from '../Service/type/types.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent {
  types: any[] = [];
  newTypes: { name: string }[] = [{ name: '' }]; // Array of new types
  loading: boolean = true;
  error: string | null = null;

  constructor(private typeService: TypesService) {}

  ngOnInit(): void {
    this.fetchTypes();
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

  addTypeField(): void {
    this.newTypes.push({ name: '' });
  }

  removeType(index: number): void {
    this.newTypes.splice(index, 1);
  }

  saveTypes(): void {
    const typeNames = this.newTypes
      .map((type) => type.name.trim())
      .filter((name) => name); // Ensure no empty values

    if (typeNames.length === 0) {
      alert('Please add at least one valid type.');
      return;
    }

    this.typeService.saveType(typeNames).subscribe(
      (response: any) => {
        this.fetchTypes(); // Refresh the type list
        this.newTypes = [{ name: '' }]; // Reset the form
      },
      (error: any) => {
        console.error('Failed to save types:', error);
        alert('Failed to save types.');
      }
    );
  }
}
