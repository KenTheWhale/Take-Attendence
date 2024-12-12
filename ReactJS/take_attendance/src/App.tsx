import './styles/App.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Header from './components/Header.tsx';
import Menu from './pages/MenuPage.tsx';
import Footer from './components/Footer.tsx';
import TakeAttendancePage from './pages/TakeAttendancePage';
import AbsentReasonPage from "./pages/AbsentReasonPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";


const router = createBrowserRouter([
    {
        path: "/",//account/list
        element: <Menu/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/attendance",
        element: <TakeAttendancePage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/reason",
        element: <AbsentReasonPage/>,
        errorElement: <ErrorPage/>
    }
]);

function App() {
    return (
        <div className="parent-block">
            <div className="header-block"><Header/></div>
            <main>
                <RouterProvider router={router}></RouterProvider>
            </main>
            <div className="footer-block"><Footer/></div>
        </div>
    )
}

export default App;
