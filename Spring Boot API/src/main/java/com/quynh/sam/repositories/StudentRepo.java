package com.quynh.sam.repositories;

import com.quynh.sam.models.entity_models.Student;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface StudentRepo extends JpaRepository<Student, Integer> {

    List<Student> findByCodeContaining(String code);

    List<Student> findByNameContaining(String name);
}
