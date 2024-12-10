import 'bootstrap/dist/css/bootstrap.css';
import style from '../styles/Menu.module.css';
import {Link} from "react-router-dom";

function Menu() {
    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="row">
                <div className="col-md-12">
                    <div className="text-center">
                        <Link to="/TakeAttendancePage" className={`btn ${style.buttonCustom}`}>Take Attendance</Link>
                        <Link to="/AbsentReasonPage" className={`btn ${style.buttonCustom}`}>Absent Reason</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu;