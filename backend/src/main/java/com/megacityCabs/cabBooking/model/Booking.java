package com.megacityCabs.cabBooking.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@NoArgsConstructor
@Document(collection = "bookings")
public class Booking {

    @Id
    private String id;
    private String customerName;
    private String customerId;
    private String address;
    private String driverId;
    private String driverName;
    private String vehicleType;
    private String licensePlateNo;
    private String phone;
    private String startLocation;
    private String destination;
    private String distance;
    @CreatedDate
    private Date createdDateTime;
    private String bookingStatus;
}
