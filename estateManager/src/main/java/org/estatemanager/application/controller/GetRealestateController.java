package org.estatemanager.application.controller;

import java.util.Properties;

import org.estatemanager.controller.is24.api.IS24ApiFactory;
import org.estatemanager.util.PropertiesLoader;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import de.immobilienscout24.rest.schema.offer.realestates._1.RealEstate;
import de.is24.rest.api.export.api.Is24Api;
import de.is24.rest.api.export.api.impl.InternalId;

@RestController
public class GetRealestateController {

	@RequestMapping(value = "/api/1.0/realestate/{id}", method = RequestMethod.GET)
	public RealEstate handleGet(@PathVariable("id") String id) {

		Properties properties = PropertiesLoader.getProperties();

		Is24Api api = IS24ApiFactory.getApi(properties);

		RealEstate realestate = api.getRealestate(new InternalId(id));

		System.out.println("Loaded realestate " + id);

		return realestate;
	}
}