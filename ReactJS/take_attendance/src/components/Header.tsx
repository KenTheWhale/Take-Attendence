import style from '../styles/Header.module.css'
import TimeCounter from "../ui/TimeCounter.tsx";

function Header(){
    return(
        <div className={style.body}>
            <h1>Take Attendance Management</h1>
            <TimeCounter />
        </div>
    )
}

export default Header;