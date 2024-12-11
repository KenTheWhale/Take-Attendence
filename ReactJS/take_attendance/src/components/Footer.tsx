import style from '../styles/Footer.module.css'

function Footer(){
    return (
        <div className={style.body}>
            <h1>Copyright &copy; {(new Date()).getFullYear()} Quynh. All rights reserved.</h1>
        </div>
    )
}

export default Footer;