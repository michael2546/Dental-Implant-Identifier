import { Component, OnInit } from '@angular/core';
import { RatingsService } from '../rating.service';

interface Rating {
  id: number;
  value: number;
}

@Component({
  selector: 'app-rate-us',
  templateUrl: './rate-us.component.html',
  styleUrls: ['./rate-us.component.css']
})

export class RateUsComponent implements OnInit {
  ratings: Rating[] = [];
  value: number | null = null;
  submitted = false;
  isClicked1: boolean = false;
  isClicked2: boolean = false;
  isClicked3: boolean = false;
  isClicked4: boolean = false;
  isClicked5: boolean = false;
  feedback: string = '';
  successMessage: undefined | string;
  errorMessage: undefined | string;
  showSuccessMessage = true;
  showErrorMessage = false;

  constructor(private ratingsService: RatingsService) { }

  ngOnInit(): void {
  }

  setRating(value: number) {
    this.isClicked1 = !this.isClicked1;
    this.value = value;
  }
  setRating2(value: number) {
    this.isClicked2 = !this.isClicked2;
    this.value = value;
  }
  setRating3(value: number) {
    this.isClicked3 = !this.isClicked3;
    this.value = value;
  }
  setRating4(value: number) {
    this.isClicked4 = !this.isClicked4;
    this.value = value;
  }
  setRating5(value: number) {
    this.isClicked5 = !this.isClicked5;
    this.value = value;
  }

  onSubmit() {
    if (this.value !== null && this.feedback !== null) {
      this.ratingsService.addRating(this.value, this.feedback).subscribe(
        (rating: Rating) => {
          this.ratings.push(rating);
          this.value = null;
          this.submitted = true;
          this.feedback = ''
          this.showSuccessMessage = true;
          this.successMessage = 'Thanks for Ur time ✅';
          this.showErrorMessage = false;
          this.errorMessage = '';
        },


        (error) => {
          console.log(error);
          this.showErrorMessage = true;
          this.errorMessage = 'Failed to submit rating!';
          this.showSuccessMessage = false;
          this.successMessage = '';
        }
      );
    }
    this.isClicked1 = false;
    this.isClicked2 = false;
    this.isClicked3 = false;
    this.isClicked4 = false;
    this.isClicked5 = false;

  }


}
