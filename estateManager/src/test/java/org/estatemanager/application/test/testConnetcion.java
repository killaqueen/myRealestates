package org.estatemanager.application.test;

import java.util.Properties;

import org.estatemanager.controller.is24.api.IS24ApiFactory;
import org.estatemanager.util.PropertiesLoader;

import de.is24.rest.api.export.api.Is24Api;

public class testConnetcion {

	public static void main(String[] args) {

		Properties properties = PropertiesLoader.getProperties();

		Is24Api api = IS24ApiFactory.getApi(properties);

		// List<RealEstate> allRealestates = api.getAllRealestates(10);
		// allRealestates.forEach(item -> System.out.println(item));
	}
}
