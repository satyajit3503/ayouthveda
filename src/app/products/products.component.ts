import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  isProduct: boolean = true;
  isViewProduct: boolean = false;
  selectedProduct: any = null;
  
  showEditModal = false;
  modalData: any = {
    type: '',
    items: []
  };

  constructor(private productsService: ProductsService,private router: Router) {}
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

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      console.log('Deleting product with ID:', productId);
      // Call your API service here to delete the product
    }
  }
  // Static images for now
  productImages = ['product1.jpg', 'product2.jpg', 'product3.jpg', 'product4.jpg', 'product5.jpg'];

  viewProductDetails(productId: number): void {
    this.isProduct = false;
    this.isViewProduct = true;

    // Fetch the selected product details
    this.selectedProduct = this.products.find((p) => p.id === productId);
  }

  goBackToProducts(): void {
    this.isProduct = true;
    this.isViewProduct = false;
    this.selectedProduct = null;
  }
  editProduct(): void {
    if (this.selectedProduct && this.selectedProduct.id) {
      console.log(this.selectedProduct.id);
      this.router.navigate(['/home/products/update-product', this.selectedProduct.id]);
    } else {
      console.error('Selected product is undefined or missing an ID.');
    }
  }

  addProductImage(){
    console.log("add image to product is clicked")
  }


  navigateToAddProduct() {
    console.log("here clicked")
    this.router.navigate(['/dashboard/addproduct']); // Adjust the path as needed
  }

  maxImages: number = 20; // Limit to 20 images

  // Open the modal
  openUpdateImgModal(): void {
    this.showModal = true;
  }

  // Close the modal
  closeUpdateImgModal(): void {
    this.showModal = false;
  }

  // Add a new image (simulated here for demo purposes)
  addNewImage(): void {
    if (this.productImages.length < this.maxImages) {
      // Simulate adding a new image (e.g., uploading from the file system)
      this.productImages.push('new-image.jpg'); // Add the new image path (from the assets folder)
    }
  }

  // Delete an image
  deleteImage(index: number): void {
    this.productImages.splice(index, 1);
  }

  // Trigger the file input to open file picker
  triggerFileInput(): void {
    const fileInput: HTMLElement = document.getElementById('fileInput') as HTMLElement;
    fileInput.click();
  }

  // Handle file selection
  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file && this.productImages.length < this.maxImages) {
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        // Push the image base64 string to the product images array
        this.productImages.push(e.target.result);
      };

      // Read the selected file as a DataURL
      reader.readAsDataURL(file);
    }
    else{
      alert("maximum image upload reached")
    }
  }

 openEditModal(type: string): void {
  this.showEditModal=true;
    // Initialize modal data based on the type
    this.modalData = {
      type: type,
      items: type === 'keyIngredients'
        ? [...this.selectedProduct?.keyIngredients] // Clone key ingredients
        : [...this.selectedProduct?.benifits] // Clone benefits
    };
   
  }

  deleteRow(index: number) {
    this.modalData.items.splice(index, 1);
  }
  
  addNewRow() {
    if (this.modalData.type === 'keyIngredients') {
      this.modalData.items.push({ name: '', description: '' });
    } else if (this.modalData.type === 'benefits') {
      this.modalData.items.push('');
    }
  }
  
  submitModalData() {
      // Logic to save the modal data
      console.log('Modal Data:', this.modalData);
      this.closeEditModal();
    }
    closeEditModal(): void {
      this.showEditModal = false;
      
    }

    onImageUpload(event: any, index: number) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.modalData.items[index].image = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
}
