package com.megacityCabs.cabBooking.controller;

import com.megacityCabs.cabBooking.dto.LoginRequest;
import com.megacityCabs.cabBooking.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;


//    @PostMapping("/register")
//    public String registerCustomer(@RequestBody AdminRegisterRequest request) {
//        return adminService.registerAdmin(request);
//    }

    @PostMapping("/login")
    public String loginAdmin(@RequestBody LoginRequest request) {
        return adminService.loginAdmin(request);
    }
}
