package org.estatemanager.application.controller;

import java.util.List;
import java.util.Properties;

import org.estatemanager.controller.is24.api.IS24ApiFactory;
import org.estatemanager.util.PropertiesLoader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import de.immobilienscout24.rest.schema.offer.realestates._1.RealEstate;
import de.is24.rest.api.export.api.Is24Api;

@RestController
public class GetRealestatesController {

	@RequestMapping(value = "/api/1.0/realestate/all", method = RequestMethod.GET)
	public List<RealEstate> handleGet() {

		Properties properties = PropertiesLoader.getProperties();

		Is24Api api = IS24ApiFactory.getApi(properties);

		List<RealEstate> allRealestates = api.getAllRealestates(5);
		// allRealestates.forEach(item -> System.out.println(item));

		return allRealestates;
	}
}