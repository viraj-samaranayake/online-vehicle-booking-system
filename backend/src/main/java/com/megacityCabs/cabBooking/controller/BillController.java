package com.megacityCabs.cabBooking.controller;

import com.megacityCabs.cabBooking.model.Bill;
import com.megacityCabs.cabBooking.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bills")
@CrossOrigin(origins = "http://localhost:5173")
public class BillController {

    @Autowired
    private BillService billService;

    @GetMapping
    public List<Bill> getAllBills(){
        return billService.getAllBills();
    }

    @GetMapping(path = "/{id}")
    public Bill getBillById(@PathVariable String id){
        return billService.getBillById(id);
    }

    @PostMapping
    public Bill addBill(@RequestBody Bill bill){
        return billService.saveBill(bill);
    }

    @DeleteMapping(path = "/{id}")
    public String deleteBill(@PathVariable String id){
        return billService.deleteBill(id);
    }
}


















