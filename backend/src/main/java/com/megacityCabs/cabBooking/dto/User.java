package com.megacityCabs.cabBooking.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

@Data
@NoArgsConstructor
public class User {

    @Id
    private String id;

    @NotNull(message = "Name cannot be empty")
    @Pattern(regexp = "^[A-Za-z]+(?: [A-Za-z]+)?$", message = "Name must contain only letters")
    private String name;

    @NotNull(message = "Address cannot be empty")
    private String address;

    @NotNull(message = "Phone cannot be empty")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone No must be a valid phone number (10 digits)")
    private String phone;

    @NotNull(message = "NIC cannot be empty")
    @Pattern(regexp = "^\\d{9}[VX]$|^\\d{12}$", message = "NIC must be in valid format")
    private String nic;

    @Email(message = "Email should be valid")
    @NotNull(message = "Email cannot be empty")
    @Indexed(unique = true)
    private String email;

    @NotNull(message = "Password cannot be empty")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&+=!])(?=\\S+$).{8,20}$", message = "Password must be between 8 and 20 characters, include at least one uppercase letter, one lowercase letter, one number, and one special character")
    private String password;

}
