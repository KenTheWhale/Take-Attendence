package com.quynh.sam.repositories;


import com.quynh.sam.models.entity_models.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepo extends JpaRepository<Attendance, Integer> {

}
