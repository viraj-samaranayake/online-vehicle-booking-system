package com.megacityCabs.cabBooking.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
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
    @Pattern(regexp = "^[A-Za-z]+(?: [A-Za-z]+)?$", message = "Name must contain only letters")
    private String name;

    @NotNull(message = "Mobile No cannot be empty")
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile No must be a 10 digits number")
    private String mobileNo;

    @Email(message = "Email should be valid")
    @NotNull(message = "Email cannot be empty")
    @Indexed(unique = true)
    private String email;

    @NotNull(message = "NIC cannot be empty")
    @Pattern(regexp = "^\\d{9}[VX]$|^\\d{12}$", message = "NIC must be in valid format")
    private String nicNo;

    @DBRef      // Reference to the Car document (1-to-1 relationship)
    private Car assignedCar;

    @NotNull(message = "Driving License No cannot be empty")
    @Pattern(regexp = "^[A-Z]\\d{7}$", message = "Driving License Number must be in valid format")
    private String drivingLicenseNo;

    @NotNull(message = "Experience years cannot be empty")
    @Pattern(regexp = "^[0-9]{1,2}$", message = "Years of experience must be a valid digit")
    private String experienceYears;

}
