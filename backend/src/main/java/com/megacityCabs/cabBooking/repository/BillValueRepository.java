package com.megacityCabs.cabBooking.repository;

import com.megacityCabs.cabBooking.model.BillValue;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface BillValueRepository extends MongoRepository<BillValue,String> {

//    Optional<BillValue> findByVehicleType(String vehicleType);
}