package com.megacityCabs.cabBooking.dto;

import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;

@Data
public class CustomerRegisterRequest {

    private String name;
    private String address;
    private String phone;
    private String nic;
    @Indexed(unique = true)
    private String email;
    private String password;
    private String role = "customer";
}
