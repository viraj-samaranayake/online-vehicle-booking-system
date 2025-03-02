package com.megacityCabs.cabBooking.service;

import com.megacityCabs.cabBooking.model.Bill;
import com.megacityCabs.cabBooking.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

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
