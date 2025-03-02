package com.megacityCabs.cabBooking.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "billValues")
public class BillValue {

    @Id
    private String id;
    private String vehicleType;
    private double firstTwentyPerKm;
    private double twentyPlusPerKm;
    private double tax;
    private double discount;

    public BillValue() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public double getFirstTwentyPerKm() {
        return firstTwentyPerKm;
    }

    public void setFirstTwentyPerKm(double firstTwentyPerKm) {
        this.firstTwentyPerKm = firstTwentyPerKm;
    }

    public double getTwentyPlusPerKm() {
        return twentyPlusPerKm;
    }

    public void setTwentyPlusPerKm(double twentyPlusPerKm) {
        this.twentyPlusPerKm = twentyPlusPerKm;
    }

    public double getTax() {
        return tax;
    }

    public void setTax(double tax) {
        this.tax = tax;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }
}
