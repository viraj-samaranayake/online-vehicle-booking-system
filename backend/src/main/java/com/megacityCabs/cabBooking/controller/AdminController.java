package com.megacityCabs.cabBooking.controller;

import com.megacityCabs.cabBooking.model.Admin;
import com.megacityCabs.cabBooking.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;


//    @PostMapping("/register")
//    public ResponseEntity<?> adminRegister(@Valid @RequestBody Admin admin, BindingResult bindingResult) {
//        if (bindingResult.hasErrors()) {
//            StringBuilder errorMessage = new StringBuilder();
//            bindingResult.getAllErrors().forEach(error -> errorMessage.append(error.getDefaultMessage()).append("\n"));
//            return ResponseEntity.badRequest().body(errorMessage.toString());
//        }
//
//        // Check if the NIC already exists
//        if (adminService.isNicExists(admin.getNic())) {
//            return ResponseEntity.status(HttpStatus.CONFLICT).body("This NIC already exists!");
//        }
//
//        // Check if the email already exists
//        if (adminService.isEmailExists(admin.getEmail())) {
//            return ResponseEntity.status(HttpStatus.CONFLICT).body("This Email already exists!");
//        }
//
//        // Register the customer
//        Admin savedAdmin = adminService.registerAdmin(admin);
//        return ResponseEntity.status(HttpStatus.CREATED).body(savedAdmin);
//    }

    @PostMapping("/login")
    public ResponseEntity<String> adminLogin(@RequestBody Admin admin) {
        String loginMessage = adminService.adminLogin(admin);

        // Determine the appropriate status code based on the message
        if ("Login successful!".equals(loginMessage)) {
            return ResponseEntity.status(HttpStatus.OK).body(loginMessage); // 200 OK
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(loginMessage); // 400 Bad Request
    }
}
