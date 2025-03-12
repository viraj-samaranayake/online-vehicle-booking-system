package com.megacityCabs.cabBooking.controller;

import com.megacityCabs.cabBooking.dto.LoginRequest;
import com.megacityCabs.cabBooking.dto.RegisterRequest;
import com.megacityCabs.cabBooking.model.Customer;
import com.megacityCabs.cabBooking.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/customers")
public class CustomerController {


    @Autowired
    private CustomerService customerService;


//    @PostMapping
//    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
//        Customer savedCustomer = customerRepository.save(customer);
//        return ResponseEntity.ok(savedCustomer);
//    }


    @PostMapping("/register")
    public String registerCustomer(@RequestBody RegisterRequest request) {
        return customerService.register(request);
    }

    @PostMapping("/login")
    public String loginCustomer(@RequestBody LoginRequest request) {
        return customerService.loginCustomer(request);
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
