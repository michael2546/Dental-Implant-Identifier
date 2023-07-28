import { Component } from '@angular/core';
import { SupportService } from '../support.services';

interface Support {
  type: string;
  img: File;
}

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {
  type: string | null = null;
  img: File | null = null;
  submitted = false;

  constructor(private supportService: SupportService) { }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.type !== null && this.img !== null) {
      const formData = new FormData();
      formData.append('type', this.type);
      formData.append('img', this.img, this.img.name);
      this.supportService.addSupport(this.type, this.img).subscribe(
        (support: Support) => {
          this.type = null;
          this.submitted = true;
          this.img = null;
          // Reset the form
          (document.getElementById('support-form') as HTMLFormElement).reset();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.img = fileList[0];
    }
  }
}