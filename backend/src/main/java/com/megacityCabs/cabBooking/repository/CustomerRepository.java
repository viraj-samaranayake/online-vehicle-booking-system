package com.megacityCabs.cabBooking.repository;

import com.megacityCabs.cabBooking.model.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface CustomerRepository extends MongoRepository<Customer, String> {

    //Customer findByEmail(String email);
    Optional<Customer> findByEmail(String email);
}