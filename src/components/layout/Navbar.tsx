import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <div className="text-white font-bold text-lg">
                    Tiago<span className="text-indigo-400">.dev</span>
                </div>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
                    <a href="#home" className="hover:text-white transition">Home</a>
                    <a href="#projects" className="hover:text-white transition">Projects</a>
                    <a href="#about" className="hover:text-white transition">About</a>
                    <a href="#contact" className="hover:text-white transition">Contact</a>
                </div>

                {/* Mobile button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-white"
                >
                    ☰
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-gray-300 text-sm">
                    <a href="#home" className="hover:text-white">Home</a>
                    <a href="#projects" className="hover:text-white">Projects</a>
                    <a href="#about" className="hover:text-white">About</a>
                    <a href="#contact" className="hover:text-white">Contact</a>
                </div>
            )}
        </nav>
    );
}