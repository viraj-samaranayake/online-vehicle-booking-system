package com.megacityCabs.cabBooking.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "drivers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Driver {

    @Id
    private String id;
    private String name;
    private String mobileNo;
    private String email;
    private String nicNo;
    private int vehicleLicenseNo;
    private int experienceYears;
}
