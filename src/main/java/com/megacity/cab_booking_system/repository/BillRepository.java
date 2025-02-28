package com.megacity.cab_booking_system.repository;

import com.megacity.cab_booking_system.model.Bill;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BillRepository extends MongoRepository<Bill,String> {
}
