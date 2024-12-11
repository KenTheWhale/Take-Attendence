import {useState, useEffect, ChangeEvent} from "react";

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
                    s.id === id ? {...s,
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
                        <button onClick={() => handleOnClick(student.id, reason)}>Update</button>
                    </td>
                </tr>
            )
        })
    )
}

function AbsentReasonPage() {

    return (
        <div className={`container`}>
            <table className={`table table-striped`}>
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
    )
}

export default AbsentReasonPage;