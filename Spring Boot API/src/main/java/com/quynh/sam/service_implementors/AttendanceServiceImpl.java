package com.quynh.sam.service_implementors;


import com.quynh.sam.enums.Admin;
import com.quynh.sam.enums.Status;
import com.quynh.sam.models.entity_models.Attendance;
import com.quynh.sam.models.entity_models.Student;
import com.quynh.sam.models.request_models.EditReasonRequest;
import com.quynh.sam.models.request_models.UpdateAttendanceStatusRequest;
import com.quynh.sam.models.response_models.EditReasonResponse;
import com.quynh.sam.models.response_models.SendEmailResponse;
import com.quynh.sam.models.response_models.UpdateAttendanceStatusResponse;
import com.quynh.sam.models.response_models.ViewAllEditReasonResponse;
import com.quynh.sam.repositories.AttendanceRepo;
import com.quynh.sam.repositories.StudentRepo;
import com.quynh.sam.services.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.http11.Constants;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepo attendanceRepo;
    private final StudentRepo studentRepo;

    @Override
    public UpdateAttendanceStatusResponse updateAttendanceStatus(UpdateAttendanceStatusRequest request) {
        List<Attendance> attendances = attendanceRepo.findAllByDate(LocalDate.now()); // ds attendance hom nay
        if (request.getStudentList().size() != attendances.size()) {
            return UpdateAttendanceStatusResponse.builder()
                    .status("400")
                    .message("Error")
                    .build();
        }

        for (UpdateAttendanceStatusRequest.Student student : request.getStudentList()) {
            Attendance attendance = getAttendanceByStudentID(student.getId());
            String status = checkStatus(student.getStatus());
            if (status == null) {
                return UpdateAttendanceStatusResponse.builder()
                        .status("400")
                        .message("Error")
                        .build();
            }

            assert attendance != null;
            attendance.setStatus(status);
            attendanceRepo.save(attendance);
        }

        return UpdateAttendanceStatusResponse.builder()
                .status("200")
                .message("Success")
                .build();
    }

    private Attendance getAttendanceByStudentID(int id) {
        List<Attendance> attendances = attendanceRepo.findAllByDate(LocalDate.now());
        for (Attendance attendance : attendances) {
            if (attendance.getStudent().getId() == id) {
                return attendance;
            }
        }
        return null;
    }

    private String checkStatus(String status) {
        boolean isPresent = status.equalsIgnoreCase(Status.PRESENT);
        boolean isAbsent = status.equalsIgnoreCase(Status.ABSENT);
        boolean isAbsentWithoutReason = status.equalsIgnoreCase(Status.ABSENT_WITHOUT_REASON);

        if (!isPresent && !isAbsent && !isAbsentWithoutReason) {
            return null;
        }
        return isPresent ? Status.PRESENT : (isAbsent ? Status.ABSENT : Status.ABSENT_WITHOUT_REASON);
    }

    @Override
    public EditReasonResponse editReason(EditReasonRequest request) {

        for (EditReasonRequest.Student student : request.getStudentList()) {
            Attendance attendance = attendanceRepo.findByDateAndStudent_Code(LocalDate.now(), student.getStudentCode());
            assert attendance != null;
            if (student.getReason().isEmpty()) {
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

    @Override
    public SendEmailResponse sendEmail() {

        return SendEmailResponse.builder()
                .status("200")
                .message("")
                .admin(Admin.ADMIN)
                .headAdmin(Admin.HEAD_ADMIN)
                .mentor(Admin.MENTOR)
                .className(Admin.CLASS_NAME)
                .totalStudent(studentRepo.findAll().size())
                .onboardStartDate(Admin.ON_BOARD_DATE)
                .onboardStudents(getOnboardStudents())
                .totalPresentStudent(calculateTotalPresentStudent())
                .absentStudents(getAbsentStudents())
                .awrStudents(getAWRStudents())
                .build();

    }

    private List<SendEmailResponse.Student> getOnboardStudents() {
        return studentRepo.findAll().stream()
                .filter(Student::isOnboard)
                .map(student -> SendEmailResponse.Student.builder()
                        .code(student.getCode())
                        .name(student.getName())
                        .build())
                .toList();
    }

    private int calculateTotalPresentStudent() {
        return getStudentListBaseOnStatus(Status.PRESENT).size();
    }

    private List<SendEmailResponse.Student> getAbsentStudents() {
        return getStudentListBaseOnStatus(Status.ABSENT);
    }

    private List<SendEmailResponse.Student> getAWRStudents() {
       return getStudentListBaseOnStatus(Status.ABSENT_WITHOUT_REASON);
    }

    private List<SendEmailResponse.Student> getStudentListBaseOnStatus(String status) {
        return attendanceRepo.findAllByDateAndStatus(LocalDate.now(), status).stream()
                .map(attendance -> SendEmailResponse.Student.builder()
                        .code(attendance.getStudent().getCode())
                        .name(attendance.getStudent().getName())
                        .build())
                .toList();
    }
}
