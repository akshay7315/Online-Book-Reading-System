package com.main.Controller;

import com.main.entity.Contact;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/contacts")
@CrossOrigin(origins = "*")
public class ContactAdminController {

    @Autowired
    private com.main.repo.contactRepo contactRepo;

    // ✅ Get all contacts
    @GetMapping
    public List<Contact> getAllContacts() {
        return contactRepo.findAll();
    }

    // ✅ Delete a contact by ID
    @DeleteMapping("/{id}")
    public String deleteContact(@PathVariable int id) {
        if (!contactRepo.existsById(id)) {
            return "Contact not found!";
        }
        contactRepo.deleteById(id);
        return "Contact deleted successfully";
    }

    // ✅ Update contact info
    @PutMapping("/{id}")
    public Contact updateContact(@PathVariable int id, @RequestBody Contact updated) {
        Contact contact = contactRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found"));
        contact.setFullName(updated.getFullName());
        contact.setEmail(updated.getEmail());
        contact.setMessage(updated.getMessage());
        return contactRepo.save(contact);
    }
}
