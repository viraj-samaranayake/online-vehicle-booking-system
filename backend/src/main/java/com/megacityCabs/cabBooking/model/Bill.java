package com.megacityCabs.cabBooking.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "bills")
public class Bill {

    @Id
    private String id;
    private String customerName;
    private String bookingId;
    private String driverName;
    private String pickupLocation;
    private String destination;
    private String vehicleType;
    private String licensePlateNo;
    private String distance;
    private double tax;
    private double discount;
    private double total;
}
