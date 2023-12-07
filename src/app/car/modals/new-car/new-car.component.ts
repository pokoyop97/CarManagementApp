import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../service/car.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose,} from '@angular/material/dialog';
import { Car } from '../../models/car.model';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrl: './new-car.component.scss'
})
export class NewCarComponent {
  carForm: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private carService: CarService,
    public dialogRef: MatDialogRef<NewCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Car,
  ) {
    console.log(data);
    this.carForm = this.fb.group({
      Make: [data?.Make || '', Validators.required],
      Model: [data?.Model || '', Validators.required],
      Year: [data?.Year || '', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
      Id: [data?.Id]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  submitForm(): void {
    if (this.carForm.valid) {
      const car = this.carForm.value;
      this.carService.createCar(car).subscribe((x) => {
        this.dialogRef.close(x);
      });
    }
  }
}
