package com.megacity.cab_booking_system.controller;

import com.megacity.cab_booking_system.dto.LoginRequest;
import com.megacity.cab_booking_system.dto.RegisterRequest;
import com.megacity.cab_booking_system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String registerUser(@RequestBody RegisterRequest regRequest) {
        return userService.registerUser(regRequest);
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody LoginRequest logRequest) {
        return userService.loginUser(logRequest);
    }
}

