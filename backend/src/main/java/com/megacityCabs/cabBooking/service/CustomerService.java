package com.megacityCabs.cabBooking.service;

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


    public Customer registerCustomer(Customer customer) {
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        return customerRepository.save(customer);
    }

    public boolean isEmailExists(String email) {
        return customerRepository.existsByEmail(email);
    }

    public boolean isNicExists(String nic) {
        return customerRepository.existsByNic(nic);
    }


    public String loginCustomer(Customer customer) {
        Optional<Customer> fetchedCustomer = customerRepository.findByEmail(customer.getEmail());
        if (fetchedCustomer.isEmpty() || customer.getPassword().isEmpty()) {
            return "Invalid email or password";
        }
        // If the email exists, check if the password matches
        if (passwordEncoder.matches(customer.getPassword(), fetchedCustomer.get().getPassword())) {
            return "Login successful!";
        }
        return "Invalid email or password";
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
