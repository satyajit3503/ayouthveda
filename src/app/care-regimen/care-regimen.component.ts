import { Component } from '@angular/core';
import { CareRegimenService } from '../Service/care-regimen/care-regimen.service';

@Component({
  selector: 'app-care-regimen',
  templateUrl: './care-regimen.component.html',
  styleUrls: ['./care-regimen.component.css']
})
export class CareRegimenComponent {
  careRegimen: any[] = [];
  newCareRegimens: { name: string; file: File | null }[] = [{ name: '', file: null }];
  loading: boolean = true;
  error: string | null = null;

  constructor(private careRegimenService: CareRegimenService) {}
  
  ngOnInit(): void {
    this.fetchCareRegimens();
  }

  fetchCareRegimens(): void {
    this.loading = true;
    this.error = null;

    this.careRegimenService.getcareRegimen().subscribe(
      (response: any) => {
        this.careRegimen = response.serviceResponse || [];
        this.loading = false;
      },
      (error: any) => {
        console.error('API Error:', error);
        this.error = 'Failed to load care regimens.';
        this.loading = false;
      }
    );
  }

  addCareRegimen(): void {
    this.newCareRegimens.push({ name: '', file: null });
  }

  removeCareRegimen(index: number): void {
    this.newCareRegimens.splice(index, 1);
  }

  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.newCareRegimens[index].file = file;
    }
  }

  saveCareRegimens(): void {
    const formData = new FormData();
    this.newCareRegimens.forEach((regimen, index) => {
      formData.append(`collections[${index}].name`, regimen.name);
      if (regimen.file) {
        formData.append(`collections[${index}].file`, regimen.file);
      }
    });

    this.careRegimenService.savecareRegimen(formData).subscribe(
      (response) => {
        console.log('Success:', response);
        this.newCareRegimens = [{ name: '', file: null }];
        this.fetchCareRegimens();
      },
      (error) => {
        console.error('Error:', error);
        this.error = 'Failed to save care regimens.';
      }
    );
  }
}
