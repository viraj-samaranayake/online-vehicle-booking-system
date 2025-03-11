package com.megacityCabs.cabBooking.service;

import com.megacityCabs.cabBooking.dto.CustomerRegisterRequest;
import com.megacityCabs.cabBooking.dto.LoginRequest;
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
    public String registerCustomer(CustomerRegisterRequest request) {
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
        customer.setRole(request.getRole());

        customerRepository.save(customer);
        return "Customer registered successfully!";
    }

    // Login------------
    public String loginCustomer(LoginRequest request) {
        Optional<Customer> customer = customerRepository.findByEmail(request.getEmail());

        if (customer.isPresent() && passwordEncoder.matches(request.getPassword(), customer.get().getPassword())) {
            return "Login successful!";
        }
        return "Invalid email or password!";
    }


    public List<Customer> getAllCustomers(){
        return customerRepository.findAll();
    }
}
