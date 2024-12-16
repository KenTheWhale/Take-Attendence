package com.quynh.sam.repositories;


import com.quynh.sam.models.entity_models.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepo extends JpaRepository<Attendance, Integer> {
    List<Attendance> findAllByDate(LocalDate date);

    Attendance findByDateAndStudent_Code(LocalDate date, String code);

    List<Attendance> findAllByDateAndStatus(LocalDate date, String status);
}
