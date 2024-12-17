package com.quynh.sam.controllers;

import com.quynh.sam.models.request_models.EditReasonRequest;
import com.quynh.sam.models.request_models.UpdateAttendanceStatusRequest;
import com.quynh.sam.models.response_models.*;
import com.quynh.sam.services.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PutMapping("/edit/status")
    public UpdateAttendanceStatusResponse updateAttendanceStatus(@RequestBody UpdateAttendanceStatusRequest request) {
        return attendanceService.updateAttendanceStatus(request);
    }

    @PutMapping("/edit/reason")
    public EditReasonResponse editReason(@RequestBody EditReasonRequest request) {
        return attendanceService.editReason(request);
    }

    @GetMapping("/list")
    public ViewAllEditReasonResponse viewAllEditReason() {
        return attendanceService.viewAllEditReason();
    }

    @GetMapping("/send/email")
    public SendEmailResponse sendEmail() {
        return attendanceService.sendEmail();
    }
}
