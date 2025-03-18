package com.megacityCabs.cabBooking.model;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "drivers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Driver {

    @Id
    private String id;

    @NotNull(message = "Name cannot be empty")
    private String name;

    @NotNull(message = "Mobile number cannot be empty")
    private String mobileNo;
    private String email;
    private String nicNo;

    @DBRef      // Reference to the Car document (one-to-one relationship)
    private Car assignedCar;

    private String drivingLicenseNo;
    private String experienceYears;

}
