package com.megacityCabs.cabBooking.service;

import com.megacityCabs.cabBooking.dto.LoginRequest;
import com.megacityCabs.cabBooking.model.Admin;
import com.megacityCabs.cabBooking.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    //Register-----------
//    public String registerAdmin(RegisterRequest request) {
//        if (adminRepository.findByEmail(request.getEmail()).isPresent()) {
//            return "Your Email already registered!";
//        }
//
//        Admin admin = new Admin();
//        admin.setName(request.getName());
//        admin.setEmail(request.getEmail());
//        admin.setPhone(request.getPhone());
//        admin.setAddress(request.getAddress());
//        admin.setNic(request.getNic());
//        admin.setPassword(passwordEncoder.encode(request.getPassword())); // Encrypt password
//        admin.setRole(request.getRole());
//
//        adminRepository.save(admin);
//        return "Admin registered successfully!";
//    }

    // Login------------
    public String loginAdmin(LoginRequest request) {
        Optional<Admin> admin = adminRepository.findByEmail(request.getEmail());

        if (admin.isPresent() && passwordEncoder.matches(request.getPassword(), admin.get().getPassword())) {
            return "Login successful!";
        }
        return "Invalid email or password!";
    }
}
