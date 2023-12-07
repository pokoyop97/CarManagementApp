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
  isEdit:boolean=false;
  constructor(
    private fb: FormBuilder, 
    private carService: CarService,
    public dialogRef: MatDialogRef<NewCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {
    if(data?.id) this.isEdit= true;
    this.carForm = this.fb.group({
      Id:[data?.id || 0],
      Make: [data?.make || '', Validators.required],
      Model: [data?.model || '', Validators.required],
      Year: [data?.year || '', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  submitForm(): void {
    if (this.carForm.valid) {
      const car = this.carForm.value;
      if(!this.isEdit){
        this.carService.createCar(car).subscribe((x) => {
          this.dialogRef.close(x);
        });
      }else{
        this.carService.editCar(car).subscribe((x)=> {
          this.dialogRef.close(x);
        })
      }
    }
  }
}
