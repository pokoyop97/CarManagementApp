import { Component } from '@angular/core';
import { Car } from '../../models/car.model';
import { CarService } from '../../service/car.service';
import { MatDialog} from '@angular/material/dialog';
import { NewCarComponent } from '../../modals/new-car/new-car.component';

@Component({
  selector: 'app-home-car',
  templateUrl: './home-car.component.html',
  styleUrl: './home-car.component.scss'
})
export class HomeCarComponent {
  cars: Car[] = [];
  displayedColumns: string[] = ['Make', 'Model', 'Year', 'Actions'];

  constructor(private carService: CarService,
  private modalService: MatDialog) {}

  ngOnInit(): void {
    this.loadCars();
  }
  addCar():void{
    const dialog = this.modalService.open(NewCarComponent,{
      data:{Id:this.cars.length+1}
    })
    dialog.afterClosed().subscribe(result=>{
      this.cars.push(result)
      console.log(this.cars)
    })
  }
  editCar(car:Car):void{
    const dialog = this.modalService.open(NewCarComponent,{
      data:car
    })
    dialog.afterClosed().subscribe(result=>{
      if(result){
        this.cars.push(result)
        console.log(this.cars)
      }
    })
  }
  loadCars(): void {
    this.carService.getCars().subscribe(cars => (this.cars = cars));
  }

  deleteCar(id: number): void {
    this.carService.deleteCar(id).subscribe(() => this.loadCars());
  }
}
