package com.megacity.cab_booking_system.repository;

import com.megacity.cab_booking_system.model.Car;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CarRepository  extends MongoRepository<Car,String> {
}
