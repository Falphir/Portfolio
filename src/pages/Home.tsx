import Hero from "../components/sections/Hero";
import About from "../components/sections/About.tsx";
import Projects from "../components/sections/Projects.tsx";
import Skills from "../components/sections/Skills.tsx";
import Contact from "../components/sections/Contact.tsx";
import Education from "../components/sections/Education.tsx";
import Experience from "../components/sections/Experience.tsx";

export default function Home() {
    return (
        <div className="w-full max-w-[1600px] items-center mx-auto px-6 sm:px-8 lg:px-10">

            <Hero />
            <div className="w-full max-w-7xl mx-auto border-t border-white/10 my-16" />
            <About />
            <div className="w-full max-w-7xl mx-auto border-t border-white/10 my-16" />
            <Education />
            <div className="w-full max-w-7xl mx-auto border-t border-white/10 my-16" />
            <Experience />
            <div className="w-full max-w-7xl mx-auto border-t border-white/10 my-16" />
            <Projects />
            <div className="w-full max-w-7xl mx-auto border-t border-white/10 my-16" />
            <Skills />
            <div className="w-full max-w-7xl mx-auto border-t border-white/10 my-16" />
            <Contact />

        </div>
    );
}