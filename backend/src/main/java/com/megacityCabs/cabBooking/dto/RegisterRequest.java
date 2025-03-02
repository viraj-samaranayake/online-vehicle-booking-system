package com.megacityCabs.cabBooking.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String phone;
    private String address;
    private String nic;
    private String password;
}
