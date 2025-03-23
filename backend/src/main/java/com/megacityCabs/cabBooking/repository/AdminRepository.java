package com.megacityCabs.cabBooking.repository;

import com.megacityCabs.cabBooking.model.Admin;
import com.megacityCabs.cabBooking.model.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AdminRepository extends MongoRepository<Admin, String> {
    Optional<Admin> findByEmail(String email);
//    boolean existsByEmail(String email);
//    boolean existsByNic(String nic);
}