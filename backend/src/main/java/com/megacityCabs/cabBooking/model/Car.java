package com.megacityCabs.cabBooking.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "cars")
public class Car {

    @Id
    private String id;
    private String carType;
    private String brand;
    private String model;
    private String licensePlateNo;
    private boolean status = true;
}
