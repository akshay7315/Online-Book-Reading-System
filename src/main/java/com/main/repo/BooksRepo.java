package com.main.repo;


import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.main.entity.Books;

public interface BooksRepo extends JpaRepository<Books, Long> {
    List<Books> findByEmail(String email);
}	
