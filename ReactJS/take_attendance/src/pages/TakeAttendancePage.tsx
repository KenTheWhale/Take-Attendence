import 'bootstrap/dist/css/bootstrap.css';
import { useState } from "react";
import style from "../styles/Attendance.module.css";
import { Link } from "react-router-dom";

interface StudentProps {
    id: number;
    name: string;
    status: string;
}

function TakeAttendancePage() {
    const [students, setStudents] = useState<StudentProps[]>([
        {
            id: 1,
            name: "John",
            status: "Absent"
        },
        {
            id: 2,
            name: "Isac",
            status: "Absent"
        }
    ]);

    function renderStudents() {
        return students.map(student => {
            return (
                <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>
                        <span>{student.status === "Absent" ? "Absent without reason" : student.status}</span>
                    </td>
                    <td>
                        <button
                            className="btn btn-success"
                            onClick={() => alert(`Attendance for ${student.name} is set to Present`)}
                        >
                            Present
                        </button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <div className={`container ${style.tableCustom}`}>
            <h1 className="text-center my-4">Take Attendance</h1>
            <table className={`table table-striped ${style.tableCustom}`}>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {renderStudents()}
                </tbody>
            </table>
            <div className="text-center">
                <Link to="/" className="btn btn-primary">Back</Link>
            </div>
        </div>
    );
}

export default TakeAttendancePage;
