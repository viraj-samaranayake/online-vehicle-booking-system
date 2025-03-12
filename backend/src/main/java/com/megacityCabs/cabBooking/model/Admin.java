package com.megacityCabs.cabBooking.model;

import com.megacityCabs.cabBooking.dto.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "admin")
public class Admin extends User {

}