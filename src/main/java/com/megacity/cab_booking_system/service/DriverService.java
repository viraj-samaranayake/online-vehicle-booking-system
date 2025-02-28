package com.megacity.cab_booking_system.service;

import com.megacity.cab_booking_system.model.Driver;
import com.megacity.cab_booking_system.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    public Driver addDriver(Driver driver) {
        return driverRepository.save(driver);
    }

//    public Optional<Driver> getDriverByNic(String nicNo) {
//        return driverRepository.findByNicNo(nicNo);
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

