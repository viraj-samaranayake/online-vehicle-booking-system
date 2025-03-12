package com.megacityCabs.cabBooking.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "billValues")
public class BillValue {

    @Id
    private String id;
    private String vehicleType;
    private double firstTwentyPerKm;
    private double twentyPlusPerKm;
    private double tax;
    private double discount;
}
