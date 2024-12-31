import { Component } from '@angular/core';
import { ProductsService } from '../Service/Products/products.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  showModal: boolean = false;
  selectedProductId: number | null = null;
  imageFiles: { file: File; order: number; preview: string }[] = []; // Store files with their order

  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    this.fetchproducts();
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

  openImageModal(productId: number): void {
    this.selectedProductId = productId;
    this.showModal = true;
    this.imageFiles = []; // Reset the file list
  }

  closeModal(): void {
    this.showModal = false;
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const files: File[] = Array.from(event.dataTransfer.files);
      files.forEach((file: File) => {
        this.imageFiles.push({
          file,
          order: this.imageFiles.length + 1,
          preview: URL.createObjectURL(file), // Generate preview URL
        });
      });
    }
  }

  onFileInput(event: any): void {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.imageFiles.push({
        file: files[i],
        order: this.imageFiles.length + 1,
        preview: URL.createObjectURL(files[i]), // Generate preview URL
      });
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  drop(event: CdkDragDrop<{ file: File; order: number }[]>): void {
    moveItemInArray(this.imageFiles, event.previousIndex, event.currentIndex);
    // Update order after rearranging
    this.imageFiles.forEach((item, index) => {
      item.order = index + 1;
    });
  }
  getImagePreview(file: File): string {
    return URL.createObjectURL(file);
  }
  
  removeImage(index: number): void {
    const removed = this.imageFiles.splice(index, 1)[0];
    URL.revokeObjectURL(removed.preview); // Clean up the preview URL
    // Update order after removing
    this.imageFiles.forEach((item, i) => {
      item.order = i + 1;
    });
  }
  

  uploadImages(): void {
    if (!this.selectedProductId || this.imageFiles.length === 0) {
      alert('Please select images to upload.');
      return;
    }

    const formData = new FormData();
    this.imageFiles.forEach((item, index) => {
      formData.append(`productImages[${index}].order`, item.order.toString());
      formData.append(`productImages[${index}].file`, item.file);
    });

    const productId = this.selectedProductId;

    this.productsService.addProductImage(productId, formData).subscribe(
      (response) => {
        this.closeModal();
        alert('Images uploaded successfully.');
      },
      (error) => {
        console.error('Image upload error:', error);
        alert('Failed to upload images.');
      }
    );
  }
}
