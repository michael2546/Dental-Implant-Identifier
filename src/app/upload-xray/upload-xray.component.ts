import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload-xray',
  templateUrl: './upload-xray.component.html',
  styleUrls: ['./upload-xray.component.css']
})

export class UploadXrayComponent {

  processedImageUrl!: string;
  selectedFile!: File;
  prediction: any;
  m = 'More About Implant';
  mb = false;
  showResult = false;
  label!: string
  confd!: string

  constructor(private http: HttpClient, private router: Router) { }

  /////////////////////////////////////////////// Routes ////////////////////////////////////////////////

  homeRouter() {
    this.router.navigate([''])
  }
  signUp() {
    this.router.navigate(['/signup'])
  }

  /////////////////////////////////////////////// Preview ////////////////////////////////////////////////

  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('imageElement') imageElement!: ElementRef;
  @ViewChild('resultBtn') resultBtn!: ElementRef;
  @ViewChild('resultBox') resultBox!: ElementRef;

  fileChanged(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      const url = URL.createObjectURL(file);
      this.imageElement.nativeElement.removeAttribute('hidden');

      const element = this.imageElement.nativeElement;
      element.src = url;
      element.onload = () => URL.revokeObjectURL(element.src);
      const uploadImgElement = document.querySelector('.preview') as HTMLDivElement;
      if (uploadImgElement !== null) {
        uploadImgElement.style.backgroundImage = `url(${url})`;
      }
    }
  }

  /////////////////////////////////////////////// Prediction ////////////////////////////////////////////////

  onSubmit() {
    this.resultBox.nativeElement.removeAttribute('hidden');
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.http.post<any>('http://127.0.0.1:8000/api/predict/', formData, { responseType: 'json' })
        .subscribe((response: any) => {
          const processedImageUrl = URL.createObjectURL(this.base64ToBlob(response.image));
          this.processedImageUrl = processedImageUrl;
          this.label = response.labels;
          this.confd = response.conf;
          this.imageElement.nativeElement.removeAttribute('hidden');
          const element = this.imageElement.nativeElement;
          element.src = processedImageUrl;
          element.onload = () => URL.revokeObjectURL(element.src);
          const uploadImgElement = document.querySelector('.result') as HTMLDivElement;
          if (uploadImgElement !== null) {
            uploadImgElement.style.backgroundImage = `url(${processedImageUrl})`;
            this.mb = true;
          }
        }
        );
    }
  }

  base64ToBlob(base64: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/jpeg' });
  }

  /////////////////////////////////////////////// Style ////////////////////////////////////////////////

  showGifPreview(event: any) {
    var gif = event.target.querySelector('.gif-preview');
    gif.style.left = event.clientX + 'px';
    gif.style.top = event.clientY + 'px';
  }

  hideGifPreview(event: any) {
    var gif = event.target.querySelector('.gif-preview');
    gif.style.display = 'none';
  }

  showGifPreview2(event: any) {
    var gif = event.target.querySelector('.gif-preview2');
    gif.style.left = event.clientX + 'px';
    gif.style.top = event.clientY + 'px';
  }

  hideGifPreview2(event: any) {
    var gif = event.target.querySelector('.gif-preview2');
    gif.style.display = 'none';
  }
  downloadImage() {
    const link = document.createElement('a');
    link.href = this.processedImageUrl;
    link.download = 'implant_image.jpg';
    link.click();
  }
}


