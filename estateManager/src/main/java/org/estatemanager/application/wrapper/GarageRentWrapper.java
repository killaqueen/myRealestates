package org.estatemanager.application.wrapper;

import de.immobilienscout24.rest.schema.offer.realestates._1.GarageRent;

public class GarageRentWrapper extends RealEstateWrapper {

	public GarageRent getRealestate() {
		return (GarageRent) realestate;
	}

	public void setRealestate(GarageRent realestate) {
		this.realestate = realestate;
	}
}
