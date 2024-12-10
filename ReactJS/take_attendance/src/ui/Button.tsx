import style from '../styles/Button.module.css'
import {Link} from "react-router-dom";

interface Props {
    message: string,
    height: number,
    width: number,
    textSize: number,
    borderRadius: number,
}

function Button(props: Props) {
    return (
        <>
            <Link to={'https://fap.fpt.edu.vn/Default.aspx'}>
                <button
                    className={style.customButton}
                    style={{
                        height: props.height,
                        width: props.width,
                        fontSize: props.textSize + 'px',
                        borderRadius: props.borderRadius,
                    }}
                >
                    {props.message}
                </button>
            </Link>
        </>
    )
}

export default Button;