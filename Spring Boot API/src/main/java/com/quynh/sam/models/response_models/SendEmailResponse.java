package com.quynh.sam.models.response_models;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SendEmailResponse {

    String status;

    String message;

    String admin;

    String headAdmin;

    String mentor;

    String className;

    int totalStudent;

    String onboardStartDate;

    List<Student> onboardStudents;

    int totalPresentStudent;

    List<Student> absentStudents;

    List<Student> awrStudents;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class Student {
        String code;
        String name;
    }
}
