import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from "./pages/Home.tsx";
import Background from "./components/Background";
import Navbar from "./components/layout/Navbar.tsx";

function App() {
    return (
        <div className="relative min-h-screen text-white">
            <Navbar />
            <Background />
            <BrowserRouter>
                <div className="relative z-10">
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App