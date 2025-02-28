package com.megacity.cab_booking_system.service;

import com.megacity.cab_booking_system.model.Bill;
import com.megacity.cab_booking_system.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;

    public Bill saveBill(Bill bill){
        return billRepository.save(bill);
    }

    public List<Bill> getAllBills(){
        return billRepository.findAll();
    }

    public Bill getBillById(String id){
        return billRepository.findById(id).orElse(null);
    }

    public String deleteBill(String id){
        billRepository.deleteById(id);
        return "Deleted successfully";
    }
}

