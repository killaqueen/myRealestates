
package org.estatemanager.application.wrapper;

import de.immobilienscout24.rest.schema.offer.realestates._1.CompulsoryAuction;

public class SpecialPurposeWrapper extends RealEstateWrapper {
	public CompulsoryAuction getRealestate() {
		return (CompulsoryAuction) realestate;
	}

}
