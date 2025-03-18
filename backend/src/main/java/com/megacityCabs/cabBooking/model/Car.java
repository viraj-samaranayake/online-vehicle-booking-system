package com.megacityCabs.cabBooking.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "cars")
public class Car {

    @Id
    private String id;

    @NotNull(message = "Vehicle type cannot be empty")
    @Size(min = 3, max = 30, message = "Vehicle Type must be between 3 and 30 characters")
    private String vehicleType;

    @NotNull(message = "Brand cannot be empty")
    @Size(min = 2, max = 30, message = "Brand name must be between 2 and 30 characters")
    private String brand;

    @NotNull(message = "Model cannot be empty")
    @Size(min = 1, max = 30, message = "Model name must be between 1 and 30 characters")
    private String model;

    @NotNull(message = "License plate number cannot be empty")
    @Pattern(regexp = "^[A-Z0-9-]+$", message = "License plate number must be alphanumeric and may include dashes")
    @Size(min = 7, message = "Model name must be at least 7 characters")
    private String licensePlateNo;

    private boolean status = true;

}
