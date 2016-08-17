package org.estatemanager.controller.is24.api;

import java.util.Properties;

import de.is24.rest.api.export.api.Is24Api;
import de.is24.rest.api.export.api.impl.IS24ApiImpl;

/**
 * 
 * @author Martin Fluegge
 *
 */
public class IS24ApiFactory {

	public final static Is24Api getApi(Properties properties) {

		Is24Api api = new IS24ApiImpl();
		api.init(properties.getProperty("apiKey"), properties.getProperty("apiSecret"),
				properties.getProperty("apiUrl"));
		api.signIn(properties.getProperty("accessToken"), properties.getProperty("accessTokenSecret"));

		return api;
	}
}
