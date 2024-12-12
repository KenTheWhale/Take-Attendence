import style from '../styles/Popup.module.css'

interface PopupData{
    message: string,
    onCancelClick: () => void,
    onOkClick: () => void,
}

function Popup(popupData: PopupData){
    return (
        <div className={style.popup_overlay}>
            <div className={style.popup}>
                <h2>Warning</h2>
                <p>{popupData.message}</p>
                <div className={style.button_container}>
                    <button className={`btn btn-danger`} onClick={popupData.onCancelClick}>Cancel</button>
                    <button className={`btn btn-success`} onClick={popupData.onOkClick}>Ok</button>
                </div>
            </div>
        </div>
    )
}

export default Popup;