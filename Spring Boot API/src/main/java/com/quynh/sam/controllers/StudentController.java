package com.quynh.sam.controllers;

import com.quynh.sam.models.request_models.SearchStudentRequest;
import com.quynh.sam.models.response_models.SearchStudentResponse;
import com.quynh.sam.models.response_models.ViewAllStudentsResponse;
import com.quynh.sam.services.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @GetMapping("/list")
    public ViewAllStudentsResponse viewAllStudents() {
        return studentService.getAllStudents();
    }

    @PostMapping("/search")
    public SearchStudentResponse searchStudent(@RequestBody SearchStudentRequest request) {
        return studentService.searchStudent(request);
    }

}
