import './styles/App.css'
import {BrowserRouter} from "react-router-dom";
import Header from './components/Header.tsx'
import Menu from "./pages/MenuPage.tsx";
import Footer from './components/Footer.tsx'
function App() {


  return (
    <>
        <BrowserRouter>
            <Header/>
            <main>
                <Menu/>
            </main>
            <Footer/>
        </BrowserRouter>

    </>
  )
}

export default App
