import {useState, useEffect} from "react";
import style from '../styles/TimeCounter.module.css'

function TimeCounter() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);



    const date = new Date();

    return (
        <>
            <p className={style.title} style={{
                fontWeight:"bold",
            }}>Date: {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}, Time: {time.toLocaleTimeString()}
            </p>
        </>
    );
}

export default TimeCounter;