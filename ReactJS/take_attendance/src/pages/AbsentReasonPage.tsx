import {useState, useEffect, ChangeEvent} from "react";
import {useNavigate} from "react-router-dom";
import style from '../styles/Reason.module.css'
import Popup from "../ui/Popup.tsx";
import SearchBar from "../ui/SearchBar.tsx";

interface Student {
    id: number,
    code: string,
    name: string,
    reason: string,
    status: string
}

interface StudentData {
    status: string,
    message: string,
    students: [{
        id: number,
        code: string,
        name: string,
        reason: string,
        status: string,
    }]
}

function AbsentReasonPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [name, setName] = useState<string[]>([]);
    const [code, setCode] = useState<string[]>([]);
    const navigate = useNavigate()
    const [isFinish, setIsFinish] = useState(false)
    const [popupOpen, setPopupOpen] = useState(false)
    const [originStudents, setOriginStudents] = useState<Student[]>([]);

    const openPopup = () => setPopupOpen(true)
    const closePopup = () => {
        setPopupOpen(false)
        navigate('/')
    }
    const cancelPopup = () => {
        setPopupOpen(false)
    }

    const handleBack = () => {
        if (isFinish) {
            setIsFinish(false)
            navigate('/')
        } else {
            openPopup()
        }
    }

    const handleFinish = () => {
        setIsFinish(true)
    }

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch("http://localhost:8080/attendance/list", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    mode: "cors"
                });

                if (!response.ok) {
                    console.log("Error: " + response.status);
                }

                const data: StudentData = await response.json();
                setStudents(data.students)
                setOriginStudents(data.students);
                const names: string[] = data.students.map(s => s.name)
                const codes: string[] = data.students.map(s => s.code)
                setName(names)
                setCode(codes)
            } catch (err) {
                console.log("Error: " + err);
            }
        };

        fetchStudent();
    }, [])

    useEffect(() => {
        sessionStorage.setItem("students", JSON.stringify(students));
    }, [students])

    const search = (keyword: string, type: string) => {
        if (keyword.length !== 0) {
            const searchedStudents = originStudents.filter(student => {
                    if (type === "name") {
                        return student.name.toLowerCase().includes(keyword.toLowerCase())
                    } else {
                        return student.code.toLowerCase().includes(keyword.toLowerCase())
                    }
                }
            )

            setStudents(searchedStudents)
        }else {
            setStudents(originStudents)
        }


    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>, id: number) => {
        const updatedStudents = students.map(student =>
            student.id === id ? {...student, reason: event.currentTarget.value} : student
        )

        setStudents(updatedStudents);
    }

    return (
        <div className={`container ${style.parent_block}`}>
            <SearchBar dataName={name} dataCode={code} searchFunction={search}/>
            <div className={style.table_container}>
                <table className={`table table-striped table-hover table-bordered ${style.table_block}`}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Reason</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        students.map((student, index) => {
                            return (
                                <tr key={index}>
                                    <td>{student.id}</td>
                                    <td>{student.code}</td>
                                    <td>{student.name}</td>
                                    <td>{student.status}</td>
                                    <td>
                                        <input
                                            onChange={(event) => handleChange(event, student.id)}
                                            placeholder={student.reason.length === 0 ? 'No reason' : student.reason}/>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
            <div className={`${style.button_block}`}>
                <button className={`btn btn-danger`} onClick={handleBack}>Back</button>
                <button className={`btn btn-success`} onClick={handleFinish}>Finish</button>
            </div>
            <div>
                {popupOpen ? <Popup message={"You haven't save the attendance, do you still want to process ?"}
                                    onOkClick={closePopup} onCancelClick={cancelPopup}/> : null}
            </div>

        </div>
    )
}

export default AbsentReasonPage;