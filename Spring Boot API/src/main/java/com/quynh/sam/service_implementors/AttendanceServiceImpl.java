package com.quynh.sam.service_implementors;


import com.quynh.sam.enums.Status;
import com.quynh.sam.models.entity_models.Attendance;
import com.quynh.sam.models.entity_models.Student;
import com.quynh.sam.models.request_models.EditReasonRequest;
import com.quynh.sam.models.request_models.UpdateAttendanceStatusRequest;
import com.quynh.sam.models.response_models.EditReasonResponse;
import com.quynh.sam.models.response_models.UpdateAttendanceStatusResponse;
import com.quynh.sam.models.response_models.ViewAllEditReasonResponse;
import com.quynh.sam.repositories.AttendanceRepo;
import com.quynh.sam.services.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepo attendanceRepo;

    @Override
    public UpdateAttendanceStatusResponse updateAttendanceStatus(UpdateAttendanceStatusRequest request) {
        List<Attendance> studentAttendanceList = attendanceRepo.findAll().stream()
                .filter(attendance -> attendance.getDate().equals(LocalDate.now()))
                .toList();

        // Kiểm tra kích thước danh sách từ request và DB có khớp không
        if (studentAttendanceList.size() != request.getStudentList().size()) {
            return UpdateAttendanceStatusResponse.builder()
                    .status("400")
                    .message("The size of the student list does not match the number of attendance records.")
                    .build();
        }

        // Use constants from the Status class
        List<String> validStatuses = Arrays.asList(
                Status.PRESENT,
                Status.ABSENT,
                Status.ABSENT_WITHOUT_REASON
        );

        Map<Integer, String> studentStatusMap = new HashMap<>();

        for (UpdateAttendanceStatusRequest.Student student : request.getStudentList()) {
            if (studentStatusMap.containsKey(student.getId())) {
                return UpdateAttendanceStatusResponse.builder()
                        .status("400")
                        .message("Duplicate student ID found: " + student.getId())
                        .build();
            }
            studentStatusMap.put(student.getId(), student.getStatus());
        }

     for (Attendance attendance : studentAttendanceList) {

         String status = getStudentStatus(request, attendance.getStudent().getId());

         // Check if student status is valid
         if (status == null && !validStatuses.contains(status)) {
             return UpdateAttendanceStatusResponse.builder()
                     .status("400")
                     .message("No status found for student ID " + attendance.getStudent().getId())
                     .build();
         }

         attendance.setStatus(getStudentStatus(request, attendance.getStudent().getId()));
     }

        attendanceRepo.saveAll(studentAttendanceList);

        return UpdateAttendanceStatusResponse.builder()
                .status("200")
                .message("Successfully updated attendance status")
                .build();
    }
    private String getStudentStatus(UpdateAttendanceStatusRequest request, int id){
//        for(UpdateAttendanceStatusRequest.Student student : request.getStudentList()) {
//            if(student.getId() == id) {
//                return student.getStatus();
//            }
//        }
//        return null;
        return request.getStudentList().stream()
                .filter(student -> student.getId() == id)
                .map(UpdateAttendanceStatusRequest.Student::getStatus)
                .findFirst()
                .orElse(null);
    }

    @Override
    public EditReasonResponse editReason(EditReasonRequest request) {

        for(EditReasonRequest.Student student : request.getStudentList()) {
            Attendance attendance = attendanceRepo.findByDateAndStudent_Code(LocalDate.now(), student.getStudentCode());
            assert attendance != null;
            if(!student.getReason().isEmpty()){
                attendance.setStatus(Status.ABSENT);

            } else {
                attendance.setStatus(Status.ABSENT_WITHOUT_REASON);
            }
            attendance.setReason(student.getReason());
            attendanceRepo.save(attendance);
        }


        return EditReasonResponse.builder()
                .status("200")
                .message("Successfully edited reason")
                .build();
    }

    @Override
    public ViewAllEditReasonResponse viewAllEditReason() {
        return ViewAllEditReasonResponse.builder()
                .status("200")
                .message("")
                .students(
                        attendanceRepo.findAll().stream()
                                .filter(attendance -> attendance.getDate().equals(LocalDate.now()))
                                .filter(attendance -> !attendance.getStatus().equals(Status.PRESENT))
                                .map(
                                        attendance -> ViewAllEditReasonResponse.Student.builder()
                                                .id(attendance.getId())
                                                .code(attendance.getStudent().getCode())
                                                .name(attendance.getStudent().getName())
                                                .reason(attendance.getReason())
                                                .status(getStatusFromStudent(attendance.getStudent()))
                                                .build()
                                )
                                .toList()
                )
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
}
