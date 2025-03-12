package com.megacityCabs.cabBooking.controller;

import com.megacityCabs.cabBooking.model.Booking;
import com.megacityCabs.cabBooking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // create booking
    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        Booking savedBooking = bookingService.createBooking(booking);
        return ResponseEntity.ok(savedBooking);
    }

    // Get all bookings
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }



    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable String id) {
        try {
            Booking booking = bookingService.getBookingById(id);
            return ResponseEntity.ok(booking);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(null); // Return 404 if booking not found
        }
    }



    @PutMapping("/{id}")
    public Booking updateBooking(@PathVariable String id,@RequestBody Booking booking){
        return bookingService.updateBooking(booking);
    }

    // Get bookings by customerId
    @GetMapping("/customers/{customerId}")
    public List<Booking> getBookingsByCustomerId(@PathVariable String customerId) {
        return bookingService.getBookingsByCustomerId(customerId);
    }
}


