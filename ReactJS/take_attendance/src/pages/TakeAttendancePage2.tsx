import style from '../styles/Attendance2.module.css';
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";

interface Student {
    id: number;
    name: string;
    code: string;
    status: string;
}

interface StudentData {
    status: string;
    message: string;
    studentList: Student[];
}

const handleFinish = () => {
    const studentList: Student[] = JSON.parse(sessionStorage.getItem("studentList") || "[]");
    const prepareStudent = {
        studentList: studentList.map(s => ({
            id: s.id,
            status: s.status
        }))
    }
    fetch("http://localhost:8080/attendance/edit/status", {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(prepareStudent)
    }).then(response => console.log(response.json()))
}

function RenderTableBody() {

    const present = "Present";
    const absent = "Absent";
    const awr = "Absent without reason";
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/student/list", {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => response.json())
            .then((data: StudentData) => {
                const newStudent = data.studentList.map((student: Student) => {
                    return {
                        id: student.id,
                        name: student.name,
                        code: student.code,
                        status: student.status
                    };
                });
                setStudents(newStudent);
            })
            .catch(error => {
                console.log("Error: " + error);
            });
    }, []);


    const handleOnClick = (id: number) => {
        return () => {
            const newStudents = students.map(s =>
                s.id === id ? {...s, status: s.status === present ? awr : present} : s
            )
            setStudents(newStudents);
        }
    }

    useEffect(() => {
        sessionStorage.setItem("studentList", JSON.stringify(students));
    }, [students])

    return students.map((student, index) => {
        const btnText = student.status === present ? absent : present;
        const btnStyle = student.status === present ? "btn btn-success" : "btn btn-danger";
        return (
            <tr key={index}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.code}</td>
                <td>{student.status}</td>
                <td>
                    <button className={btnStyle} onClick={handleOnClick(student.id)}>{btnText}</button>
                </td>
            </tr>
        )
    })
}

function TakeAttendancePage2() {
    return (
        <div className="container">
            <div className={style.parent}>
                <table className={`table table-striped table-bordered ${style.tbl}`}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {RenderTableBody()}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-center pt-5 pb-5 h-">
                <Link to="/" className={`btn btn-outline-warning fa-solid fa-chevron-left}`}><FontAwesomeIcon
                    icon={faChevronLeft}/><span className="m-lg-3">Back</span></Link>
                <Link onClick={handleFinish} to="/attendance/2" className={`btn btn-outline-info`}><span className="m-lg-3">Finish</span></Link>
            </div>
        </div>

    )
}

export default TakeAttendancePage2;