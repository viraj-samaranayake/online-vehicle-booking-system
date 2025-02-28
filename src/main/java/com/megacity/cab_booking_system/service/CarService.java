package com.megacity.cab_booking_system.service;

import com.megacity.cab_booking_system.model.Car;
import com.megacity.cab_booking_system.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Car addCar(Car car) {
        return carRepository.save(car);
    }

    public Car getCarById(String id) {
        return carRepository.findById(id).orElse(null);
    }

    public Car updateCar(Car car) {
        return carRepository.save(car);
    }

    public void deleteCar(String id) {
        carRepository.deleteById(id);
    }
}

