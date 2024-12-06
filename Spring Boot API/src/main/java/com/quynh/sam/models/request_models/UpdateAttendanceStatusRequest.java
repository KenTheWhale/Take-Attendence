package com.quynh.sam.models.request_models;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateAttendanceStatusRequest {

    List<Student> studentList;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Student {
        int id;
        String status;
    }
}
