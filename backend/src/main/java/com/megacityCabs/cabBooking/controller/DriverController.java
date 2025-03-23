package com.megacityCabs.cabBooking.controller;

import com.megacityCabs.cabBooking.model.Customer;
import com.megacityCabs.cabBooking.model.Driver;
import com.megacityCabs.cabBooking.service.DriverService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

//    @PostMapping
//    public Driver addDriver(@RequestBody Driver driver) {
//        return driverService.addDriver(driver);
//    }


    @PostMapping
    public ResponseEntity<?> addDriver(@Valid @RequestBody Driver driver, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errorMessage = new StringBuilder();
            bindingResult.getAllErrors().forEach(error -> errorMessage.append(error.getDefaultMessage()).append("\n"));
            return ResponseEntity.badRequest().body(errorMessage.toString());
        }

        // Check if the NIC already exists
        if (driverService.isNicExists(driver.getNicNo())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("This NIC already exists!");
        }

        // Check if the email already exists
        if (driverService.isEmailExists(driver.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("This Email already exists!");
        }

        // Check if the driving license No already exists
        if (driverService.isDrivingLicenseNoExists(driver.getDrivingLicenseNo())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("This driving license already exists!");
        }

        // Add the driver
        Driver savedDriver = driverService.addDriver(driver);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedDriver);
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
