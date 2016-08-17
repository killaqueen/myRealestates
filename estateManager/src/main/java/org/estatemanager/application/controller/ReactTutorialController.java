package org.estatemanager.application.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.estatemanager.model.Comment;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class ReactTutorialController {

	public static int count = -1;

	public static List<Comment> comments = new ArrayList<Comment>();

	{
		add("Martin Flügge", "This is *another* comment");
		add("Paul Blase", "This is *another* comment");
		add(new Random().nextInt() + "", "This is *another* comment");
	}

	private void add(String name, String comment) {
		comments.add(new Comment(count++, name, comment));
	}

	@RequestMapping("/api/comments")
	public String handleGet() {

		ObjectMapper mapper = new ObjectMapper();
		try {
			String jsonInString = mapper.writeValueAsString(comments);

			System.out.println(jsonInString);
			return jsonInString;
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
	}

	@RequestMapping(value = "/api/comments", method = RequestMethod.POST)
	public void handlePost(Comment comment) {
		System.out.println(comment.getAuthor() + " " + comment.getText());
		comment.setId(count++);
		comments.add(comment);
	}
}