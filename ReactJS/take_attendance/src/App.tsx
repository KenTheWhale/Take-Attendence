import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.tsx';
import Menu from './pages/MenuPage.tsx';
import Footer from './components/Footer.tsx';
import TakeAttendancePage from './pages/TakeAttendancePage';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Menu />} />
                    <Route path="/TakeAttendancePage" element={<TakeAttendancePage />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
