import style from '../styles/Header.module.css'
import TimeCounter from "../ui/TimeCounter.tsx";

function Header(){
    return(
        <>
            <h1 className={style.text}>Take Attendance Management</h1>
            <TimeCounter />
        </>
    )
}

export default Header;