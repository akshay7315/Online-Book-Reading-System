package com.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.main.entity.Contact;
import com.main.repo.contactRepo;

@Service
public class Contactservice {

	@Autowired
	private contactRepo contactRepo;
	
	public Contact savefeedback(Contact contact) {
		return contactRepo.save(contact);
	}
	
	

}
