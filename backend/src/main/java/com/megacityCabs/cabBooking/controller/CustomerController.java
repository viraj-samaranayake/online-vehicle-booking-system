package com.megacityCabs.cabBooking.controller;

import com.megacityCabs.cabBooking.dto.CustomerRegisterRequest;
import com.megacityCabs.cabBooking.dto.LoginRequest;
import com.megacityCabs.cabBooking.model.Customer;
import com.megacityCabs.cabBooking.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public String registerCustomer(@RequestBody CustomerRegisterRequest request) {
        return customerService.registerCustomer(request);
    }

    @PostMapping("/login")
    public String loginCustomer(@RequestBody LoginRequest request) {
        return customerService.loginCustomer(request);
    }



    // Get all customers---
    @GetMapping
    public List<Customer> getAllCustomers(){
        return customerService.getAllCustomers();
    }

}
