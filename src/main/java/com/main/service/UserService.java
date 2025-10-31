package com.main.service;

import com.main.entity.User;
import com.main.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ Register new user (normal USER role)
    public void register(User user) {
        // Encrypt password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Ensure only normal users register here
        user.setRole("USER");

        repo.save(user);
    }

    // ✅ Check if a user exists by username
    public boolean existsByUsername(String username) {
        return repo.existsByUsername(username);
    }

    // ✅ Find user by username
    public User findByUsername(String username) {
        return repo.findByUsername(username).orElse(null);
    }
}
