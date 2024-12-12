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
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepo attendanceRepo;

    @Override
    public UpdateAttendanceStatusResponse updateAttendanceStatus(UpdateAttendanceStatusRequest request) {

        List<Attendance> studentAttendanceList = attendanceRepo.findAll().stream()
                .filter(attendance -> attendance.getDate().equals(LocalDate.now()))
                .toList();

     for (Attendance attendance : studentAttendanceList) {
         attendance.setStatus(getStudentStatus(request, attendance.getStudent().getId()));
     }

        attendanceRepo.saveAll(studentAttendanceList);

        return UpdateAttendanceStatusResponse.builder()
                .status("200")
                .message("Successfully updated attendance status")
                .build();
    }

    private String getStudentStatus(UpdateAttendanceStatusRequest request, int id){
        for(UpdateAttendanceStatusRequest.Student student : request.getStudentList()) {
            if(student.getId() == id) {
                return student.getStatus();
            }
        }
        return null;
    }


    @Override
    public EditReasonResponse editReason(EditReasonRequest request) {
        Attendance attendance = attendanceRepo.findByDateAndStudent_Code(LocalDate.now(), request.getStudentCode());
        assert attendance != null;
        attendance.setStatus(Status.ABSENT);
        attendance.setReason(request.getReason());
        attendanceRepo.save(attendance);

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
