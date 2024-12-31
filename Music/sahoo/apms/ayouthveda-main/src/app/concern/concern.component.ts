import { Component } from '@angular/core';
import { ConcernService } from '../Service/concern/concern.service';

@Component({
  selector: 'app-concern',
  templateUrl: './concern.component.html',
  styleUrls: ['./concern.component.css']
})
export class ConcernComponent {
  concern: any[] = [];
  newConcerns: { name: string; file: File | null }[] = [{ name: '', file: null }];
  loading: boolean = true;
  error: string | null = null;

  constructor(private concernService: ConcernService) {}

  ngOnInit(): void {
    this.fetchConcern();
  }

  fetchConcern(): void {
    this.loading = true;
    this.error = null;

    this.concernService.getConcern().subscribe(
      (response: any) => {
        this.concern = response.serviceResponse || [];
        this.loading = false;
      },
      (error: any) => {
        console.error('API Error:', error);
        this.error = 'Failed to load concern.';
        this.loading = false;
      }
    );
  }

  addConcern(): void {
    this.newConcerns.push({ name: '', file: null });
  }

  removeConcern(index: number): void {
    this.newConcerns.splice(index, 1);
  }

  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.newConcerns[index].file = file;
    }
  }

  saveConcerns(): void {
    const formData = new FormData();
    this.newConcerns.forEach((concern, index) => {
      formData.append(`collections[${index}].name`, concern.name);
      if (concern.file) {
        formData.append(`collections[${index}].file`, concern.file);
      }
    });

    this.concernService.saveConcern(formData).subscribe(
      (response) => {
        console.log('Success:', response);
        this.newConcerns = [{ name: '', file: null }];
        this.fetchConcern();
      },
      (error) => {
        console.error('Error:', error);
        this.error = 'Failed to save concerns.';
      }
    );
  }
}
