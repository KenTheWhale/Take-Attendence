package com.quynh.sam.models.response_models;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SearchStudentResponse {

    String status;

    String message;

    String type;

    List<Student> studentList;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Student {
        int id;
        String code;
        String name;
        String status;
    }
}
