package com.quynh.sam;

import com.quynh.sam.enums.Status;
import com.quynh.sam.models.entity_models.Attendance;
import com.quynh.sam.models.entity_models.Student;
import com.quynh.sam.repositories.AttendanceRepo;
import com.quynh.sam.repositories.StudentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication
@RequiredArgsConstructor
public class SamApplication {

	private final AttendanceRepo attendanceRepo;

	private final StudentRepo studentRepo;

	public static void main(String[] args) {
		SpringApplication.run(SamApplication.class, args);
	}

	@Bean
	public CommandLineRunner initData() {
		return new CommandLineRunner() {
			@Override
			public void run(String... args) throws Exception {
					List<Attendance> attendances = attendanceRepo.findAllByDate(LocalDate.now());

					if (attendances.isEmpty()) {
						for(Student student : studentRepo.findAll()) {
							attendanceRepo.save(
									Attendance.builder()
											.date(LocalDate.now())
											.reason("")
											.status(Status.ABSENT_WITHOUT_REASON)
											.student(student)
											.build()
							);
						}
					}
			}
		};
	}

}
