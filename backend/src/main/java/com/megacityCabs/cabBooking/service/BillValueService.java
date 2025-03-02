package com.megacityCabs.cabBooking.service;

import com.megacityCabs.cabBooking.model.BillValue;
import com.megacityCabs.cabBooking.repository.BillValueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BillValueService {

    @Autowired
    private BillValueRepository billValueRepository;

    public BillValue createBillvalue(BillValue billValue){
        return billValueRepository.save(billValue);
    }


    // Get BillValue by id
    public BillValue getBillValueById(String id) {
        return billValueRepository.findById(id).orElse(null);
    }

    public List<BillValue> getAllB(){
        return billValueRepository.findAll();
    }

    public BillValue updateBillValue(BillValue billValue){
        return billValueRepository.save(billValue);
    }

    public void deleteBillValue(String id){
        billValueRepository.deleteById(id);
    }
}
