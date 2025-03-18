package com.megacityCabs.cabBooking.service;

import com.megacityCabs.cabBooking.dto.LoginRequest;
import com.megacityCabs.cabBooking.dto.RegisterRequest;
import com.megacityCabs.cabBooking.model.Customer;
import com.megacityCabs.cabBooking.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    //Register-----------
//    public String registerCustomer(CustomerRegisterRequest request) {
//        if (customerRepository.findByEmail(request.getEmail()).isPresent()) {
//            return "Your Email already registered!";
//        }
//
//        Customer customer = new Customer();
//        customer.setName(request.getName());
//        customer.setEmail(request.getEmail());
//        customer.setPhone(request.getPhone());
//        customer.setAddress(request.getAddress());
//        customer.setNic(request.getNic());
//        customer.setPassword(passwordEncoder.encode(request.getPassword())); // Encrypt password
//        //customer.setRole(request.getRole());
//
//        customerRepository.save(customer);
//        return "Customer registered successfully!";
//    }

    //Register-----------
    public String register(RegisterRequest request) {
        if (customerRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Your Email already registered!";
        }

        Customer customer = new Customer();
        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());
        customer.setNic(request.getNic());
        customer.setPassword(passwordEncoder.encode(request.getPassword())); // Encrypt password
        //customer.setRole(request.getRole());

        customerRepository.save(customer);
        return "Customer registered successfully!";
    }

    // Login------------
    public String loginCustomer(LoginRequest request) {
        Optional<Customer> customer = customerRepository.findByEmail(request.getEmail());
        if (customer.isEmpty() || request.getPassword() == "") {
            return "Invalid email or password";
        }
        // If the email exists, check if the password matches
        if (passwordEncoder.matches(request.getPassword(), customer.get().getPassword())) {
            return "Login successful!";
        }
        return "Invalid password!";
    }


    // Get All Customers
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // Get Customer by Email
    public Optional<Customer> getCustomerByEmail(String email) {
        return customerRepository.findByEmail(email);
    }
}
