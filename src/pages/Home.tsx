import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/sections/Hero";
import Projects from "../components/sections/Projects.tsx";
import Skills from "../components/sections/Skills.tsx";
import Contact from "../components/sections/Contact.tsx";
import Education from "../components/sections/Education.tsx";
import Experience from "../components/sections/Experience.tsx";
import Footer from "../components/layout/Footer.tsx";

export default function Home() {
    const { hash } = useLocation();

    useEffect(() => {
        if (!hash) return;
        const el = document.getElementById(hash.slice(1));
        el?.scrollIntoView({ behavior: "smooth" });
    }, [hash]);

    return (
        <div className="w-full max-w-[1600px] items-center mx-auto px-6 sm:px-8 lg:px-10">

            <Hero />
            <div className="w-full max-w-7xl mx-auto border-t border-white/10 my-16" />
            <Projects />
            <div className="w-full max-w-7xl mx-auto border-t border-white/10 my-16" />
            <Experience />
            <div className="w-full max-w-7xl mx-auto border-t border-white/10 my-16" />
            <Education />
            <div className="w-full max-w-7xl mx-auto border-t border-white/10 my-16" />
            <Skills />
            <div className="w-full max-w-7xl mx-auto border-t border-white/10 my-16" />
            <Contact />
            <Footer />

        </div>
    );
}
