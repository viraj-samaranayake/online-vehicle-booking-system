package com.megacityCabs.cabBooking.repository;

import com.megacityCabs.cabBooking.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookingRepository extends MongoRepository<Booking, String> {

}
