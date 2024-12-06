package com.quynh.sam.services;

import com.quynh.sam.models.request_models.SearchStudentRequest;
import com.quynh.sam.models.response_models.SearchStudentResponse;
import com.quynh.sam.models.response_models.ViewAllStudentsResponse;

public interface StudentService {

    ViewAllStudentsResponse getAllStudents();

    SearchStudentResponse searchStudent(SearchStudentRequest request);

}
