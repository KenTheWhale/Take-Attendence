package com.quynh.sam.controllers;

import com.quynh.sam.models.request_models.EditReasonRequest;
import com.quynh.sam.models.request_models.UpdateAttendanceStatusRequest;
import com.quynh.sam.models.response_models.EditReasonResponse;
import com.quynh.sam.models.response_models.UpdateAttendanceStatusResponse;
import com.quynh.sam.services.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
