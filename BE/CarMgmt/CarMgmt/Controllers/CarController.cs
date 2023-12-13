using Microsoft.AspNetCore.Mvc;
using CarMgmt;

[ApiController]
[Route("api/cars")]
public class CarsController : ControllerBase
{

    protected readonly UnitOfWork uow;

    public CarsController(UnitOfWork _uow)
    {
        uow = _uow;
    }

    [HttpGet]
    public IActionResult GetCars()
    {

        var cars = uow.CarRepository.Get();
        return Ok(cars);
    }

    [HttpGet("{id}")]
    public IActionResult GetCarById(int id)
    {
        var car = uow.CarRepository.GetByID(id);
        if (car == null)
        {
            return NotFound();
        }
        return Ok(car);
    }

    [HttpPost]
    public IActionResult AddCar([FromBody] Car car)
    {
        uow.CarRepository.Insert(car);
        uow.Save();
        return CreatedAtAction(nameof(GetCars), new { id = car.Id }, car);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateCar(int id, [FromBody] Car car)
    {

        var originalCar = uow.CarRepository.GetByID(car.Id);
        originalCar.Year = car.Year;
        originalCar.Model = car.Model;
        originalCar.Make = car.Make;

        uow.CarRepository.Update(originalCar);
        uow.Save();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteCar(int id)
    {
        var originalCar = uow.CarRepository.GetByID(id);
        uow.CarRepository.Delete(originalCar);
        uow.Save();
        return NoContent();
    }
}
