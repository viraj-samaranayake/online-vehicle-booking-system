package com.megacity.cab_booking_system.repository;

import com.megacity.cab_booking_system.model.Driver;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DriverRepository  extends MongoRepository<Driver,String> {
}
