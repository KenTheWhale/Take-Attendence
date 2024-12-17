import style from '../styles/Email.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";

interface Student {
    code: string;
    name: string;
}

interface Email {
    status: string;
    message: string;
    admin: string;
    headAdmin: string;
    mentor: string;
    className: string;
    totalStudent: number;
    onboardStartDate: string;
    onboardStudents: Student[];
    totalPresentStudent: number;
    absentStudents: Student[];
    awrStudents: Student[];
}

function EmailPage() {

    const [email, setEmail] = useState<Email>();

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const response = await fetch("http://localhost:8080/attendance/send/email", {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const data: Email = await response.json();
                setEmail(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchEmail().then(response => console.log(response));
    }, [])

    function loopHandler(students: Student[]) {
        return students.map((student, index) => {
            return (
                <h2 key={index} className={style.custom_indent2}> {index + 1}. {student.name} - {student.code}</h2>
            )
        })
    }

    function renderResult(email: Email) {
        return (
            <>
                <div className="row">
                    <div className="col">
                        <div className="col-md-12">
                            <h2>Dear <span>{email.admin}, {email.headAdmin}, {email.mentor}</span></h2><br/>
                            <h2>I am sending this email to report today's attendance:</h2>
                            <h2 className={style.custom_indent}> - Total member: <span>{email.totalStudent}</span>
                            </h2>
                            <h2 className={style.custom_indent}> - On
                                board(<span>{email.onboardStartDate}</span>): <span>{email.onboardStudents.length}</span>
                            </h2>
                            {loopHandler(email.onboardStudents)}
                            <h2 className={style.custom_indent}> - Available
                                members: <span>{email.totalStudent - email.onboardStudents.length}</span></h2>
                            <h2 className={style.custom_indent}> - Present: <span>{email.totalPresentStudent}</span>
                            </h2>
                            <h2 className={style.custom_indent}> -
                                Absent: <span>{email.absentStudents.length + email.awrStudents.length}</span></h2>
                            <h2 className={style.custom_indent1}> Authorized: <span>{email.absentStudents.length}</span>
                            </h2>
                            {loopHandler(email.absentStudents)}
                            <h2 className={style.custom_indent1}> UnAuthorized: <span>{email.awrStudents.length}</span>
                            </h2>
                            {loopHandler(email.awrStudents)}
                            <br/>
                            <h2> Thank you for taking the time to read my email. If you have any problems, please
                                contact me
                                directly. </h2>
                            <h2> Thank you very much. </h2>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center pt-5 pb-5">
                        <Link to="/" className={`btn btn-outline-warning fa-solid fa-chevron-left}`}><FontAwesomeIcon icon={faChevronLeft}/><span className="m-lg-3">Back</span></Link>
                </div>
            </>
        )
    }

    return (
        <div className={`container ${style.parent}`}>
            {
                email ? (renderResult(email)) : (<h1>No data</h1>)
            }

        </div>
    )
        ;
}

export default EmailPage;