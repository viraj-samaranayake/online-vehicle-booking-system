package com.megacityCabs.cabBooking.repository;

import com.megacityCabs.cabBooking.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends MongoRepository<Booking, String> {

    List<Booking> findByCustomerId(String customerId);

    // Custom method to find booking by id
    Optional<Booking> findById(String id);
}
