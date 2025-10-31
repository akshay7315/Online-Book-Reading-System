package com.main.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.main.entity.Contact;
import com.main.service.Contactservice;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

	@Autowired
	private Contactservice contactservice;

	@PostMapping
	public String receiveContact(@RequestBody Contact contact) {
		contactservice.savefeedback(contact);
		return "Thank you " + contact.getFullName() + ", your message has been received!";
	}

}
