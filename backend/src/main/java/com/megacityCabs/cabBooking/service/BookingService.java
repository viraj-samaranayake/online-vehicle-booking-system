package com.megacityCabs.cabBooking.service;

import com.megacityCabs.cabBooking.model.Booking;
import com.megacityCabs.cabBooking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking createBooking(Booking booking){
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }


    // Get booking by ID
    public Booking getBookingById(String id) {
        Optional<Booking> booking = bookingRepository.findById(id);
        if (booking.isPresent()) {
            return booking.get();
        } else {
            throw new RuntimeException("Booking not found with id: " + id); // Handle booking not found case
        }
    }


    public List<Booking> getBookingsByCustomerId(String customerId) {
        return bookingRepository.findByCustomerId(customerId);
    }

    public Booking updateBooking(Booking booking){
        return bookingRepository.save(booking);
    }

}
