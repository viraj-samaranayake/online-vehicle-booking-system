package com.megacityCabs.cabBooking.repository;

import com.megacityCabs.cabBooking.model.Driver;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DriverRepository extends MongoRepository<Driver, String> {
    //Driver findByNicNo(String nicNo);
    boolean existsByEmail(String email);
    boolean existsByNicNo(String nic);
    boolean existsByDrivingLicenseNo(String drivingLicenseNo);
}
