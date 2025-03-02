package com.megacityCabs.cabBooking.repository;

import com.megacityCabs.cabBooking.model.Driver;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface DriverRepository extends MongoRepository<Driver, String> {
    //Driver findByNicNo(String nicNo);
}
