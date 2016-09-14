package org.estatemanager.application.wrapper;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo.As;
import com.fasterxml.jackson.annotation.JsonTypeInfo.Id;

import de.immobilienscout24.rest.schema.offer.realestates._1.RealEstate;

@JsonTypeInfo(use = Id.NAME, include = As.PROPERTY, property = "type")
@JsonSubTypes({
		@JsonSubTypes.Type(value = org.estatemanager.application.wrapper.CompulsoryAuctionWrapper.class, name = "CompulsoryAuctionWrapper"),
		@JsonSubTypes.Type(value = GarageRentWrapper.class, name = "GarageRentWrapper") })
public abstract class RealEstateWrapper {

	protected RealEstate realestate;

	public abstract RealEstate getRealestate();

	public void setRealestate(RealEstate realestate) {
		this.realestate = realestate;

	}
}
