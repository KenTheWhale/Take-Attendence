import {useState, useEffect, ChangeEvent} from "react";
import {useNavigate} from "react-router-dom";
import style from '../styles/Reason.module.css'
import Popup from "../ui/Popup.tsx";

interface Student {
    id: number,
    name: string,
    reason: string
    status: string
}

function DisplayStudent() {
    const [students, setStudents] = useState<Student[]>([
        {id: 1, name: "John", reason: "", status: "Absent without reason"},
        {id: 2, name: "Kata", reason: "", status: "Absent without reason"},
        {id: 3, name: "Hanna", reason: "", status: "Absent without reason"},
        {id: 4, name: "Beta", reason: "", status: "Absent without reason"},
        {id: 5, name: "Jackson", reason: "", status: "Absent without reason"},
        {id: 6, name: "Pari", reason: "", status: "Absent without reason"},
        {id: 7, name: "Nam", reason: "", status: "Absent without reason"},
        {id: 8, name: "Hen", reason: "", status: "Absent without reason"},
        {id: 9, name: "Su", reason: "", status: "Absent without reason"},
        {id: 10, name: "Na", reason: "", status: "Absent without reason"},
    ]);



    useEffect(() => {
        sessionStorage.setItem("students", JSON.stringify(students));
    }, [students])


    return (
        students.map((student) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [reason, setReason] = useState<string>("");

            const newValue = (e: ChangeEvent<HTMLInputElement>) => {
                setReason(e.currentTarget.value);
            }

            const handleOnClick = (id: number, newReason: string) => {
                const newStudents = students.map(s =>
                    s.id === id ? {
                        ...s,
                        reason: newReason,
                        status: newReason.length !== 0 ? "Absent" : "Absent without reason",
                    } : s)

                setStudents(newStudents);
            }

            const condition: boolean = student.reason.length === 0;
            return (
                <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>
                        <input onChange={newValue}
                               placeholder={condition ? "No reason" : student.reason}
                               value={reason}
                        />
                    </td>
                    <td>
                        <button className={`btn btn-success`} onClick={() => handleOnClick(student.id, reason)}>Update
                        </button>
                    </td>
                </tr>
            )
        })
    )
}

function AbsentReasonPage() {

    const navigate = useNavigate()
    const [isFinish, setIsFinish] = useState(false)
    const [popupOpen, setPopupOpen] = useState(false)

    const openPopup = () => setPopupOpen(true)
    const closePopup = () => {
        setPopupOpen(false)
        navigate('/')
    }
    const cancelPopup = () => {
        setPopupOpen(false)
    }

    const handleBack = () => {
        if(isFinish){
            setIsFinish(false)
            navigate('/')
        }else {
            openPopup()
        }

    }

    const handleFinish = () => {
        setIsFinish(true)
    }

    return (
        <div className={`container ${style.parent_block}`}>
            <div className={style.table_container}>
                <table className={`table table-striped table-hover table-bordered ${style.table_block}`}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Reason</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {DisplayStudent()}
                    </tbody>
                </table>
            </div>
            <div className={`${style.button_block}`}>
                <button className={`btn btn-danger`} onClick={handleBack}>Back</button>
                <button className={`btn btn-success`} onClick={handleFinish}>Finish</button>
            </div>
            <div>
                {popupOpen ? <Popup message={"You haven't save the attendance, do you still want to process ?"} onOkClick={closePopup} onCancelClick={cancelPopup}/> : null}
            </div>

        </div>
    )
}

export default AbsentReasonPage;