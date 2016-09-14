package org.estatemanager.util;

import org.estatemanager.application.wrapper.CompulsoryAuctionWrapper;
import org.estatemanager.application.wrapper.GarageRentWrapper;
import org.estatemanager.application.wrapper.RealEstateWrapper;

import de.immobilienscout24.rest.schema.offer.realestates._1.CompulsoryAuction;
import de.immobilienscout24.rest.schema.offer.realestates._1.GarageRent;
import de.immobilienscout24.rest.schema.offer.realestates._1.RealEstate;

public class RealestateWrapperFactory {

	public static RealestateWrapperFactory instance = new RealestateWrapperFactory();

	public RealEstateWrapper wrap(RealEstate realestate) {
		if (realestate instanceof CompulsoryAuction) {
			CompulsoryAuctionWrapper wrapper = new CompulsoryAuctionWrapper();
			wrapper.setRealestate(realestate);
			return wrapper;
		} else if (realestate instanceof GarageRent) {
			GarageRentWrapper wrapper = new GarageRentWrapper();
			wrapper.setRealestate(realestate);
			return wrapper;
		}
		return null;
	}
}
