import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../Service/Collections/collection.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  collections: any[] = [];
  newCollections: { name: string; file: File | null }[] = [{ name: '', file: null }];
  loading: boolean = true;
  error: string | null = null;

  constructor(private collectionService: CollectionService) {}

  ngOnInit(): void {
    this.fetchCollection();
  }

  fetchCollection(): void {
    this.loading = true;
    this.error = null;

    this.collectionService.getCollections().subscribe(
      (response: any) => {
        this.collections = response.serviceResponse || [];
        this.loading = false;
      },
      (error: any) => {
        console.error('API Error:', error);
        this.error = 'Failed to load collections.';
        this.loading = false;
      }
    );
  }

  addCollection(): void {
    this.newCollections.push({ name: '', file: null });
  }

  removeCollection(index: number): void {
    this.newCollections.splice(index, 1);
  }

  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.newCollections[index].file = file;
    }
  }

  saveCollections(): void {
    const formData = new FormData();
    this.newCollections.forEach((collection, index) => {
      formData.append(`collections[${index}].name`, collection.name);
      if (collection.file) {
        formData.append(`collections[${index}].file`, collection.file);
      }
    });

    this.collectionService.addCollection(formData).subscribe(
      (response) => {
        console.log('Success:', response);
        this.newCollections = [{ name: '', file: null }];
        this.fetchCollection();
      },
      (error) => {
        console.error('Error:', error);
        this.error = 'Failed to save collections.';
      }
    );
  }
}
