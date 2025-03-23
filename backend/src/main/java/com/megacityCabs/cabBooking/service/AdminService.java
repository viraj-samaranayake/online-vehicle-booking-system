package com.megacityCabs.cabBooking.service;

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


//    public Admin registerAdmin(Admin admin) {
//        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
//        return adminRepository.save(admin);
//    }
//
//    public boolean isEmailExists(String email) {
//        return adminRepository.existsByEmail(email);
//    }
//
//    public boolean isNicExists(String nic) {
//        return adminRepository.existsByNic(nic);
//    }

    public String adminLogin(Admin admin) {
        Optional<Admin> fetchedAdmin = adminRepository.findByEmail(admin.getEmail());
        if (fetchedAdmin.isEmpty() || admin.getPassword().isEmpty()) {
            return "Invalid email or password";
        }
        // If the email exists, check if the password matches
        if (passwordEncoder.matches(admin.getPassword(), fetchedAdmin.get().getPassword())) {
            return "Login successful!";
        }
        return "Invalid email or password";
    }

}
