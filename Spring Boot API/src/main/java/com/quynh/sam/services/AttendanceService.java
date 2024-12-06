package com.quynh.sam.services;

import com.quynh.sam.models.request_models.EditReasonRequest;
import com.quynh.sam.models.request_models.UpdateAttendanceStatusRequest;
import com.quynh.sam.models.response_models.EditReasonResponse;
import com.quynh.sam.models.response_models.UpdateAttendanceStatusResponse;

public interface AttendanceService {

    UpdateAttendanceStatusResponse updateAttendanceStatus(UpdateAttendanceStatusRequest request);

    EditReasonResponse editReason(EditReasonRequest request);

}
