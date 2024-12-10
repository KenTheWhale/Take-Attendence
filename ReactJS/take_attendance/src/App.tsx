import './styles/App.css'
import Button from "./ui/Button.tsx";
import {BrowserRouter} from "react-router-dom";
import TimeCounter from "./ui/TimeCounter.tsx";

function App() {
    const buttonStyle = {
        message: 'Save',
        width: 150,
        height: 50,
        textSize: 20,
        borderRadius: 50,
    }


  return (
    <>
        <BrowserRouter>
            <TimeCounter />
            <Button {...buttonStyle}/>
        </BrowserRouter>
    </>
  )
}

export default App
