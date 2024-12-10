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

    return (
        <>
            <p className={style.title} style={{
                fontWeight:"bold",
            }}>Time: <span className={style.body}>
                    {time.toLocaleTimeString()}
                </span>
            </p>
        </>
    );
}

export default TimeCounter;