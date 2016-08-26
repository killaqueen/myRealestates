package org.estatemanager.util;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * 
 * @author Martin Fluegge
 *
 */
public class PropertiesLoader {

	private static Properties properties;

	public static final Properties getProperties() {

		if (properties == null) {

			properties = new Properties();

			InputStream input;
			try {
				input = new FileInputStream("C:\\temp\\config.properties");
				properties.load(input);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
		return properties;
	}
}
