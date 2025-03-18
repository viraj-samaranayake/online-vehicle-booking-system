package com.megacityCabs.cabBooking.service;

import com.megacityCabs.cabBooking.model.Car;
import com.megacityCabs.cabBooking.model.Driver;
import com.megacityCabs.cabBooking.repository.CarRepository;
import com.megacityCabs.cabBooking.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private CarRepository carRepository;

    public Driver addDriver(Driver driver) {
        // Check if carId is provided and if car exists in the database
        if (driver.getAssignedCar() != null && driver.getAssignedCar().getId() != null) {
            String carId = driver.getAssignedCar().getId();
            Car car = carRepository.findById(carId).orElseThrow(() -> new RuntimeException("Car not found"));

            // Set the car reference in the driver
            driver.setAssignedCar(car);
        }

        // Save the driver (with or without a car)
        return driverRepository.save(driver);
    }



    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

//    public Driver addDriver(Driver driver) {
//        return driverRepository.save(driver);
//    }


    public Driver getDriverById(String id) {
        return driverRepository.findById(id).orElse(null);
    }

    public Driver updateDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    public void deleteDriver(String id) {
        driverRepository.deleteById(id);
    }
}
