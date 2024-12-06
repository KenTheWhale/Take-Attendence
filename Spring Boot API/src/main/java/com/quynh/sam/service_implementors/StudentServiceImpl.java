package com.quynh.sam.service_implementors;


import com.quynh.sam.models.entity_models.Student;
import com.quynh.sam.models.request_models.SearchStudentRequest;
import com.quynh.sam.models.response_models.SearchStudentResponse;
import com.quynh.sam.models.response_models.ViewAllStudentsResponse;
import com.quynh.sam.repositories.StudentRepo;
import com.quynh.sam.services.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepo studentRepo;


    @Override
    public ViewAllStudentsResponse getAllStudents() {
        return ViewAllStudentsResponse.builder()
                .status("200")
                .message("")
                .studentList(studentRepo.findAll().stream()
                        .map(
                                student -> ViewAllStudentsResponse.Student.builder()
                                        .id(student.getId())
                                        .code(student.getCode())
                                        .name(student.getName())
                                        .status(getStatusFromStudent(student))
                                        .build()
                        )
                        .toList())
                .build();
    }

    private String getStatusFromStudent(Student student) {
        return student.getAttendances().stream()
                .filter(a -> a.getDate().equals(LocalDate.now()))
                .map(
                        a -> a.getStatus()
                )
                .findAny()
                .orElse(null);
    }

    @Override
    public SearchStudentResponse searchStudent(SearchStudentRequest request) {

        List<Student> students = request.getType().equals("code") ? studentRepo.findByCodeContaining(request.getKeyword()) : studentRepo.findByNameContaining(request.getKeyword());

        return SearchStudentResponse.builder()
                .status("200")
                .message("")
                .type(request.getType())
                .studentList(
                            students.stream()
                                    .map(
                                            student -> SearchStudentResponse.Student.builder()
                                                    .id(student.getId())
                                                    .code(student.getCode())
                                                    .name(student.getName())
                                                    .status(getStatusFromStudent(student))
                                                    .build()
                                    )
                                    .toList()
                )
                .build();
    }


}
