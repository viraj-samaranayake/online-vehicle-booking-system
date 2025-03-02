package com.megacityCabs.cabBooking.repository;

import com.megacityCabs.cabBooking.model.Bill;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BillRepository extends MongoRepository<Bill,String> {
}
