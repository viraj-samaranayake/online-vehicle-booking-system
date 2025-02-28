package com.megacity.cab_booking_system.repository;

import com.megacity.cab_booking_system.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookingRepository extends MongoRepository<Booking, String> {
}
