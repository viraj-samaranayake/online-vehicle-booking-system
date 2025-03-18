package com.megacityCabs.cabBooking.repository;

import com.megacityCabs.cabBooking.model.Car;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CarRepository extends MongoRepository<Car, String> {
    boolean existsByLicensePlateNo(String licensePlateNo);
}
