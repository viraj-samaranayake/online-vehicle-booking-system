package com.megacity.cab_booking_system.controller;

import com.megacity.cab_booking_system.model.Driver;
import com.megacity.cab_booking_system.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/admin/drivers")
public class DriverController {

    @Autowired
    private DriverService driverService;


    @GetMapping
    public List<Driver> getAllDrivers() {
        return driverService.getAllDrivers();
    }

    @PostMapping
    public Driver addDriver(@RequestBody Driver driver) {
        return driverService.addDriver(driver);
    }

//    @GetMapping("/{nicNo}")
//    public Optional<Driver> getDriverByNic(@PathVariable String nicNo) {
//        return driverService.getDriverByNic(nicNo);
//    }

    @GetMapping("/{id}")
    public Driver getDriverById(@PathVariable String id){
        return driverService.getDriverById(id);
    }

    @PutMapping("/{id}")
    public Driver updateDriver(@PathVariable String id, @RequestBody Driver driver) {
        driver.setId(id);
        return driverService.updateDriver(driver);
    }

    @DeleteMapping("/{id}")
    public void deleteDriver(@PathVariable String id) {
        driverService.deleteDriver(id);
    }
}

