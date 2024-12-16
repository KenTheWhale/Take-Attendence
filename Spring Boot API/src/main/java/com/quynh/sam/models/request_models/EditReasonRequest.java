package com.quynh.sam.models.request_models;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EditReasonRequest {

    List<Student> studentList;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Student {

        String studentCode;

        String reason;
    }


}
