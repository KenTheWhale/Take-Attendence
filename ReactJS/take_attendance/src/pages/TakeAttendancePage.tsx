import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from "react";
import style from "../styles/Attendance.module.css";
import {Link} from "react-router-dom";

interface StudentProps {
    id: number;
    name: string;
    status: string;
}

function TakeAttendancePage() {
    // const [students, setStudents] = useState<StudentProps[]>([
    //     {
    //         id: 1,
    //         name: "John",
    //         status: "Absent without reason"
    //     },
    //     {
    //         id: 2,
    //         name: "Isac",
    //         status: "Absent without reason"
    //     }
    // ]);
    const [students, setStudents] = useState<StudentProps[]>([]);
    useEffect(() => {
        const storedData = sessionStorage.getItem("attendanceList");
        if (storedData !== null) {
            setStudents(JSON.parse(storedData));
        } else {
            setStudents([
                {
                    id: 1,
                    name: "John",
                    status: "Absent without reason"
                },
                {
                    id: 2,
                    name: "Isac",
                    status: "Absent without reason" },
                {
                    id: 3,
                    name: "John",
                    status: "Absent without reason"
                },
                {
                    id: 4,
                    name: "Isac",
                    status: "Absent without reason"
                },
                {
                    id: 5,
                    name: "John",
                    status: "Absent without reason"
                },
                {
                    id: 6,
                    name: "Isac",
                    status: "Absent without reason"
                },
                {
                    id: 7,
                    name: "John",
                    status: "Absent without reason"
                },
                {
                    id: 8,
                    name: "Isac",
                    status: "Absent without reason"
                },
                {
                    id: 9,
                    name: "John",
                    status: "Absent without reason"
                },
                {
                    id: 10,
                    name: "Isac",
                    status: "Absent without reason"
                }
            ]);
        }
    }, []);


    function setStatus(id: number) {
        const updatedStudents = students.map(student => {
            if (student.id === id) {
                if (student.status === "Present") {
                    return { ...student, status: "Absent without reason" };
                } else {
                    return { ...student, status: "Present" };
                }
            }
            return student;
        });
        setStudents(updatedStudents);
    }

    function setAttendance() {
        sessionStorage.setItem("attendanceList", JSON.stringify(students));
        alert("Attendance data has been saved to session storage!");
    }


    function renderStudents() {
        return students.map(student => {
            let buttonClass = "";
            let buttonLabel = "";

            if (student.status === "Present") {
                buttonClass = "btn-danger";
                buttonLabel = "Absent";
            } else {
                buttonClass = "btn-success";
                buttonLabel = "Present";
            }

            return (
                <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>
                        <span>{student.status}</span>
                    </td>
                    <td>
                        <button
                            className={`btn ${buttonClass}`}
                            onClick={() => setStatus(student.id)}
                        >
                            {buttonLabel}
                        </button>
                    </td>
                </tr>
            );
        });
    }


    return (
        <div className={`container ${style.tableCustom}`}>
            <table className={`table table-striped ${style.tableCustom}`}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {renderStudents()}
                </tbody>
            </table>
            <div className="container">
                <div className="row">
                    <div className="text-center col-md-12">
                        <Link to="/" className={`btn btn-primary ${style.btnBackFinish}`}>Back</Link>
                        <button
                            onClick={setAttendance}
                            className={`btn btn-primary ${style.btnBackFinish}`}
                        >Finish</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default TakeAttendancePage;
