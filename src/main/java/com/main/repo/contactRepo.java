package com.main.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.main.entity.Contact;

@Repository
public interface contactRepo extends JpaRepository<Contact, Integer> {

}
