package com.megacityCabs.cabBooking.controller;

import com.megacityCabs.cabBooking.model.Customer;
import com.megacityCabs.cabBooking.service.CarService;
import com.megacityCabs.cabBooking.service.CustomerService;
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
@RequestMapping("/customers")
public class CustomerController {


    @Autowired
    private CustomerService customerService;
    @Autowired
    private CarService carService;

    @PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@Valid @RequestBody Customer customer, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errorMessage = new StringBuilder();
            bindingResult.getAllErrors().forEach(error -> errorMessage.append(error.getDefaultMessage()).append("\n"));
            return ResponseEntity.badRequest().body(errorMessage.toString());
        }

        // Check if the NIC already exists
        if (customerService.isNicExists(customer.getNic())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("This NIC already exists!");
        }

        // Check if the email already exists
        if (customerService.isEmailExists(customer.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("This Email already exists!");
        }

        // Register the customer
        Customer savedCustomer = customerService.registerCustomer(customer);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCustomer);
    }


    @PostMapping("/login")
    public ResponseEntity<String> loginCustomer(@RequestBody Customer customer) {
        String loginMessage = customerService.loginCustomer(customer);

        // Determine the appropriate status code based on the message
        if ("Login successful!".equals(loginMessage)) {
            return ResponseEntity.status(HttpStatus.OK).body(loginMessage); // 200 OK
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(loginMessage); // 400 Bad Request
    }


    @GetMapping("/{email}")
    public ResponseEntity<Customer> getCustomerByEmail(@PathVariable String email) {
        Optional<Customer> customer = customerService.getCustomerByEmail(email);
        if (customer.isPresent()) {
            return new ResponseEntity<>(customer.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    // Get all customers---
    @GetMapping
    public List<Customer> getAllCustomers(){
        return customerService.getAllCustomers();
    }

}
