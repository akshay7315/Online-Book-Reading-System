package com.main.repo;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.main.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // To find user by username
    Optional<User> findByUsername(String username);

    // To check if a username already exists
    boolean existsByUsername(String username);
}
