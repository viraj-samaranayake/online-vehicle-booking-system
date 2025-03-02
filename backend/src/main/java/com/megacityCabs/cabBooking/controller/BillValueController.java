package com.megacityCabs.cabBooking.controller;

import com.megacityCabs.cabBooking.model.BillValue;
import com.megacityCabs.cabBooking.service.BillValueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/admin/billvalues")
public class BillValueController {

    @Autowired
    private BillValueService billValueService;

    @PostMapping
    public BillValue createBillValue(@RequestBody BillValue billValue){
        return billValueService.createBillvalue(billValue);
    }

    @GetMapping("/{id}")
    public BillValue getById(String id){
        return billValueService.getBillValueById(id);
    }

    @GetMapping
    public List<BillValue> getAll(){
        return billValueService.getAllB();
    }


    @PutMapping("/{id}")
    public BillValue updateBillValue(@PathVariable String id , @RequestBody BillValue billValue){
        billValue.setId(id);
        return billValueService.updateBillValue(billValue);
    }

    @DeleteMapping("/{id}")
    public void deleteBillValue(@PathVariable String id){
        billValueService.deleteBillValue(id);
    }
}
