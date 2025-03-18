package com.megacityCabs.cabBooking.repository;

import com.megacityCabs.cabBooking.model.Bill;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BillRepository extends MongoRepository<Bill,String> {
    Bill findByBookingId(String bookingId);  // Custom method to find bill by bookingId
}
