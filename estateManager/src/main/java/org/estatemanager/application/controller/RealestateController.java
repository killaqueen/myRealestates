package org.estatemanager.application.controller;

import java.util.Properties;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.estatemanager.application.wrapper.RealEstateWrapper;
import org.estatemanager.controller.is24.api.IS24ApiFactory;
import org.estatemanager.util.PropertiesLoader;
import org.estatemanager.util.RealestateWrapperFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import de.immobilienscout24.rest.schema.offer.realestates._1.RealEstate;
import de.is24.rest.api.export.api.Is24Api;
import de.is24.rest.api.export.api.impl.InternalId;

@RestController
public class RealestateController {

	final Logger LOG = LogManager.getLogger(RealestateController.class);

	@RequestMapping(value = "/api/1.0/realestate/{id}", method = RequestMethod.GET)
	public RealEstateWrapper getRealestate(@PathVariable("id") String id) {

		Properties properties = PropertiesLoader.getProperties();
		Is24Api api = IS24ApiFactory.getApi(properties);

		RealEstate realestate = api.getRealestate(new InternalId(id));

		RealEstateWrapper wrapper = RealestateWrapperFactory.instance.wrap(realestate);

		LOG.info("Loaded realestate " + id + " class: " + realestate.getClass().getName());

		return wrapper;
	}

	@RequestMapping(value = "/api/1.0/realestate/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void putRealestate(@PathVariable("id") String id, @RequestBody RealEstateWrapper wrapper) {

		RealEstate realestate = wrapper.getRealestate();
		LOG.info("Updates realestate " + id + " for " + wrapper.getRealestate().getTitle() + " "
				+ realestate.getClass());
		LOG.info(wrapper.getRealestate().getDescriptionNote());

		Properties properties = PropertiesLoader.getProperties();
		Is24Api api = IS24ApiFactory.getApi(properties);
		api.updateRealestate(new InternalId(id), wrapper.getRealestate());

	}
}