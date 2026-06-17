import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from "./pages/Home.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import Background from "./components/Background";
import Navbar from "./components/layout/Navbar.tsx";

function App() {
    return (
        <BrowserRouter basename="/Portfolio">
            <div className="relative min-h-screen text-white">
                <Navbar />
                <Background />
                <div className="relative z-10">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects/:slug" element={<ProjectDetail />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App