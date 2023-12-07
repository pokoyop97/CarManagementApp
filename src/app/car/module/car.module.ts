import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { MatTableModule } from '@angular/material/table'  
  import { MatButtonModule } from '@angular/material/button';
  import { MatIconModule } from '@angular/material/icon'
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { NewCarComponent } from '../modals/new-car/new-car.component';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatDialogModule } from '@angular/material/dialog';
  import { MatInputModule } from '@angular/material/input';
  import { HttpClientModule } from '@angular/common/http';
import { CarService } from '../service/car.service';
import { HomeCarComponent } from '../components/home-car/home-car.component';


@NgModule({
  declarations: [
    NewCarComponent,
    HomeCarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    HttpClientModule
  ],
  exports:[
    NewCarComponent,
    HomeCarComponent
  ],
  providers:[
    CarService
  ]
})
export class CarModule { }
