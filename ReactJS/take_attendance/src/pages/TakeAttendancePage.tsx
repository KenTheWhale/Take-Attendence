import 'bootstrap/dist/css/bootstrap.css';
import {useState, useEffect} from "react";
import style from "../styles/Attendance.module.css";
import {Link} from "react-router-dom";
import SearchBar from "../ui/SearchBar.tsx";

interface StudentProps {
    id: number;
    code: string;
    name: string;
    status: string;
}

interface StudentData {
    status: string;
    message: string;
    studentList: [{
        id: number;
        code: string;
        name: string;
        status: string;
    }];
}


function TakeAttendancePage() {
    const [name, setName] = useState<string[]>([]);
    const [code, setCode] = useState<string[]>([]);
    const [students, setStudents] = useState<StudentProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [originStudents, setOriginStudents] = useState<StudentProps[]>([]);



    useEffect(() => {

        const fetchStudent = async () => {
            try {
                const response = await fetch('http://localhost:8080/student/list', {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    console.log('Error' + response.status);
                    return;
                }

                const data: StudentData = await response.json();
                const updatedStudents = data.studentList.map(student => {
                    return {
                        ...student,
                        status: student.status || "Absent without reason",
                    };
                });
                setOriginStudents(data.studentList);
                const names: string[] = data.studentList.map(s => s.name)
                const codes: string[] = data.studentList.map(s => s.code)
                setName(names)
                setCode(codes)

                setStudents(updatedStudents);
                setLoading(false);
            } catch (error) {
                console.log('Error' + error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudent().then(r => console.log(r));
    }, []);

    useEffect(() => {
        sessionStorage.setItem("attendanceList", JSON.stringify(students));
    }, [students]);

    function setStatus(id: number) {
        const updatedStudents = students.map(student => {
            const newStatus =
                student.status === "Present"
                    ? "Absent without reason"
                    : "Present";
            return student.id === id ? { ...student, status: newStatus } : student;
        });
        setStudents(updatedStudents);
    }

    function setAttendance() {

        const studentList: StudentProps[] = JSON.parse(sessionStorage.getItem('attendanceList') || '[]');
        const attendanceData = {
            studentList: students.map(student => ({
                id: student.id,
                status: student.status,
            })),
        };
        console.log(studentList);
            const saveData = async () => {
                try {
                    const response = await fetch('http://localhost:8080/attendance/edit/status', {
                        method: 'PUT',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(attendanceData),
                    });

                    if (!response.ok) {
                        console.log('Error' + response.status);
                        return;
                    }
                    const data: StudentData = await response.json();
                    console.log('Response:', data.message);
                }catch(error){
                    console.log('Error' + error);
                }
            }
            saveData().then(r => console.log(r));
        alert("Attendance data has been saved ");
    }

    function renderStudents() {
        return students.map(student => {
            let buttonClass = "btn ";
            let buttonLabel = "";

            if (student.status === "Present") {
                buttonClass += "btn-danger";
                buttonLabel = "Absent";
            } else {
                buttonClass += "btn-success";
                buttonLabel = "Present";
            }

            return (
                <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.code}</td>
                    <td>{student.name}</td>
                    <td>
                        <span>{student.status}</span>
                    </td>
                    <td>
                        <button
                            className={buttonClass}
                            onClick={() => setStatus(student.id)}
                        >
                            {buttonLabel}
                        </button>
                    </td>
                </tr>
            );
        });
    }

    function search(keyword: string, type: string) {
        if(keyword.length !== 0) {
            const searchedStudents = originStudents.filter(student => {
                if(type === "name") {
                    return student.name.toLowerCase().includes(keyword.toLowerCase())
                } else {
                    return student.code.toLowerCase().includes(keyword.toLowerCase())
                }
            })
            setStudents(searchedStudents)
        }else{
            setStudents(originStudents)
        }
    }


    if (loading) {
        return (
            <div>
                <div className="d-flex justify-content-center align-items-center" style={{height: "100%"}}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>

                <div className="container mt-5">
                    <div className="row">
                        <div className="text-center col-md-12">
                            <Link to="/" className={`btn btn-primary ${style.btnBackFinish}`}>Back</Link>
                        </div>

                    </div>
                </div>
            </div>


        );
    }

    return (

            <div className={`container ${style.tableCustom}`}>
                <SearchBar dataName={name} dataCode={code} searchFunction={search}/>
                <table className={`table table-striped table-hover table-bordered ${style.tableCustom}`}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Code</th>
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
                            >Finish
                            </button>
                        </div>

                    </div>
                </div>
            </div>
    );
}

export default TakeAttendancePage;
