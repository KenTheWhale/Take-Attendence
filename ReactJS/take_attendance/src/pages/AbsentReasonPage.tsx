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
    students: Student[]
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

    const handleCancel = () => {
        if (isFinish) {
            navigate('/')
        } else {
            openPopup()
        }
    }

    const handleFinish = () => {
        setIsFinish(true)
        sendStudent().then(r => console.log(r))
        navigate("/")
    }

    const sendStudent = async () => {
        try {
            const studentList: Student[] = JSON.parse(sessionStorage.getItem("students") || '[]')
            const studentRequest = {
                studentList: studentList.map(s => (
                    {
                        code: s.code,
                        reason: s.reason,
                    }
                ))
            };

            const response = await fetch("http://localhost:8080/attendance/edit/reason", {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(studentRequest)
            })

            if (!response.ok) {
                console.log("Error: " + response.status)
            }

            const data = await response.json()

            alert(data.message)

        } catch (err) {
            console.log(err)
        }
    };


    useEffect(() => {
        fetch("http://localhost:8080/attendance/list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors"
        }).then(
            response => {
                if (!response.ok) {
                    console.log("Error: " + response.status);
                }

                return response.json()
            }
        ).then(
            (data:StudentData) => {
                setStudents(data.students)
                setOriginStudents(data.students);
                const names: string[] = data.students.map(s => s.name)
                const codes: string[] = data.students.map(s => s.code)
                setName(names)
                setCode(codes)
            }
        ).catch(
            error => console.log("Error: " + error)
        )
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
        } else {
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
                                    <td>{student.reason.length > 0 ? "Absent" : student.status}</td>
                                    <td>
                                        <input
                                            onChange={(event) => handleChange(event, student.id)}
                                            placeholder={student.reason.length === 0 ? 'No reason' : ''} value={student.reason}/>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
            <div className={`${style.button_block}`}>
                <button className={`btn btn-danger`} onClick={handleCancel}>Cancel</button>
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