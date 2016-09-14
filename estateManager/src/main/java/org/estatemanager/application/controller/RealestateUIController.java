package org.estatemanager.application.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.estatemanager.application.wrapper.RealEstateWrapper;
import org.estatemanager.controller.is24.api.IS24ApiFactory;
import org.estatemanager.util.PropertiesLoader;
import org.estatemanager.util.RealestateWrapperFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import de.immobilienscout24.rest.schema.offer.realestates._1.RealEstate;
import de.is24.rest.api.export.api.Is24Api;
import de.is24.rest.api.export.api.impl.InternalId;

@RestController
public class RealestateUIController {

	final Logger LOG = LogManager.getLogger(RealestateUIController.class);

	/**
	 * This method returns the the UI description and the model-data for the
	 * view. This is a convenient method to increase performance and avoid a
	 * second API call to retrieve the UI description.
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/api/1.0/realestate/internal/ui/{id}", method = RequestMethod.GET)
	public FormData handleGet(@PathVariable("id") String id) {

		FormData data = new FormData();
		Properties properties = PropertiesLoader.getProperties();
		Is24Api api = IS24ApiFactory.getApi(properties);

		RealEstate realestate = api.getRealestate(new InternalId(id));
		prepareRealestate(realestate);

		LOG.info("Loaded realestate " + id + " class: " + realestate.getClass().getName());
		LOG.info(">>" + realestate.getDescriptionNote() + "<<");

		Schema schema = generateSchema(realestate);

		data.setRealestate(RealestateWrapperFactory.instance.wrap(realestate));
		data.setSchema(schema);

		return data;
	}

	/**
	 * jut a quick method to remove null values as the ui has currently problems
	 * with it. Need to fix it on the UI site.
	 * 
	 * @param realestate
	 */
	private void prepareRealestate(RealEstate realestate) {

		if (realestate.getOtherNote() == null) {
			realestate.setOtherNote("");
		}

		if (realestate.getFurnishingNote() == null) {
			realestate.setFurnishingNote("");
		}

		if (realestate.getDescriptionNote() == null) {
			realestate.setDescriptionNote("");
		}

		if (realestate.getLocationNote() == null) {
			realestate.setLocationNote("");
		}
	}

	private Schema generateSchema(RealEstate realestate) {
		Schema schema = new Schema();

		schema.setTitle(realestate.getTitle());
		schema.setType("object");
		schema.setRequired(Collections.singletonList("title"));

		Map<String, Property> properties = schema.getProperties();

		properties.put("title", new Property("string", "Title"));
		properties.put("externalId", new Property("string", "externalId"));
		properties.put("showAddress", new Property("boolean", "showAddress"));
		properties.put("descriptionNote", new Property("string", "descriptionNote"));
		properties.put("furnishingNote", new Property("string", "furnishingNote"));
		properties.put("locationNote", new Property("string", "locationNote"));
		properties.put("otherNote", new Property("string", "otherNote"));

		return schema;
	}

	// private Schema generateSchema(RealEstate realestate) {
	// Schema schema = new Schema();
	//
	// schema.setTitle(realestate.getTitle());
	// schema.setType("object");
	// schema.setRequired(Collections.singletonList("title"));
	//
	// Map<String, Property> properties = schema.getProperties();
	//
	// properties.put("title", new Property("string", "Title"));
	// properties.put("done", new Property("boolean", "Erledigt?"));
	//
	// Method[] methods = realestate.getClass().getMethods();
	// for (Method method : methods) {
	//
	// String methodName = method.getName();
	// if (methodName.startsWith("get")) {
	//
	// String fieldName = methodName.substring(3,
	// methodName.length()).toLowerCase();
	//
	// Class<?> returnType = method.getReturnType();
	//
	// if ("java.lang.String".equals(returnType.getName())) {
	//
	// properties.put(fieldName, new Property("string", fieldName));
	// }
	// }
	// }
	//
	// return schema;
	// }

	/**
	 * 
	 * @author mfluegge
	 *
	 */
	public static class FormData {

		private RealEstateWrapper realestate;
		private Schema schema;
		private UISchema uiSchema;

		public RealEstateWrapper getRealestate() {
			return realestate;
		}

		public void setRealestate(RealEstateWrapper realestate) {
			this.realestate = realestate;
		}

		public Schema getSchema() {
			return schema;
		}

		public void setSchema(Schema schema) {
			this.schema = schema;
		}

		public UISchema getUiSchema() {
			return uiSchema;
		}

		public void setUiSchema(UISchema uiSchema) {
			this.uiSchema = uiSchema;
		}
	}

	/**
	 * 
	 * @author mfluegge
	 *
	 */
	public static class UISchema {

	}

	/**
	 * 
	 * @author mfluegge
	 *
	 */
	public static class Schema {

		private String title;
		private String type;
		private List<String> required = new ArrayList<String>();
		private Map<String, Property> properties = new LinkedHashMap<String, RealestateUIController.Property>();

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}

		public List<String> getRequired() {
			return required;
		}

		public void setRequired(List<String> required) {
			this.required = required;
		}

		public Map<String, Property> getProperties() {
			return properties;
		}

		public void setProperties(Map<String, Property> properties) {
			this.properties = properties;
		}
	}

	public static class Property {

		private String type;
		private String title;
		private int minLength;

		public Property() {

		}

		public Property(String type, String title) {
			this.type = type;
			this.title = title;
		}

		public Property(String type, String title, int minLength) {
			this.type = type;
			this.title = title;
			this.minLength = minLength;
		}

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public int getMinLength() {
			return minLength;
		}

		public void setMinLength(int minLength) {
			this.minLength = minLength;
		}
	}
}