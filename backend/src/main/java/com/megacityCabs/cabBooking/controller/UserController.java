package com.megacityCabs.cabBooking.controller;

import com.megacityCabs.cabBooking.dto.LoginRequest;
import com.megacityCabs.cabBooking.dto.RegisterRequest;
import com.megacityCabs.cabBooking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String registerUser(@RequestBody RegisterRequest request) {
        return userService.registerUser(request);
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody LoginRequest request) {
        return userService.loginUser(request);
    }
}
