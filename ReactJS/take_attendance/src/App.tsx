import './styles/App.css'
// import Button from "./ui/Button.tsx";
import {BrowserRouter} from "react-router-dom";
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'

function App() {
    // const buttonStyle = {
    //     message: 'Save',
    //     width: 150,
    //     height: 50,
    //     textSize: 20,
    //     borderRadius: 50,
    // }


  return (
    <>
        <BrowserRouter>
            <Header/>
            {/*<Button {...buttonStyle}/>*/}
            {/*<Footer/>*/}
        </BrowserRouter>
    </>
  )
}

export default App
