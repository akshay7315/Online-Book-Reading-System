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

    public void register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setRole("USER");

        repo.save(user);
    }

    public boolean existsByUsername(String username) {
        return repo.existsByUsername(username);
    }

    public User findByUsername(String username) {
        return repo.findByUsername(username).orElse(null);
    }
}
