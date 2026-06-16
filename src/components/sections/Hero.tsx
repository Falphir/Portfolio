import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Hero() {
    const prefix = "Hi, I'm ";
    const name = "Tiago";
    const fullText = prefix + name;

    const [mounted, setMounted] = useState(false);
    const [typingStarted, setTypingStarted] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const t1 = setTimeout(() => setMounted(true), 100);
        const t2 = setTimeout(() => setTypingStarted(true), 500);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    useEffect(() => {
        if (!typingStarted || index >= fullText.length) return;
        const timeout = setTimeout(() => setIndex((prev) => prev + 1), 100);
        return () => clearTimeout(timeout);
    }, [index, fullText.length, typingStarted]);

    const isDone = typingStarted && index >= fullText.length;
    const current = fullText.slice(0, index);
    const typedPrefix = current.slice(0, prefix.length);
    const typedName = current.slice(prefix.length);

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const enter = mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6";
    const delay = (ms: number) => ({ transitionDelay: mounted ? `${ms}ms` : "0ms" });

    return (
        <section id="home" className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">

            {/* Animated background blobs */}
            <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none animate-[blob1_12s_ease-in-out_infinite]" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-600/15 blur-3xl pointer-events-none animate-[blob2_16s_ease-in-out_infinite]" />
            <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none animate-[blob3_10s_ease-in-out_infinite]" />

            {/* Status badge */}
            <div
                className={`mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-sm text-emerald-400 transition-all duration-700 ${enter}`}
                style={delay(0)}
            >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for opportunities
            </div>

            {/* Title */}
            <h1
                className={`text-5xl md:text-7xl font-bold mb-5 leading-tight tracking-tight transition-all duration-700 ${enter}`}
                style={delay(150)}
            >
                {typedPrefix}
                <span className="animate-gradient bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
                    {typedName}
                </span>
                {isDone
                    ? <img
                        src={`${import.meta.env.BASE_URL}icons/waving-hand.svg`}
                        alt="waving hand"
                        className="inline-block w-[1em] h-[1em] ml-3 mb-1 align-middle animate-[wave_1.5s_ease-in-out_1]"
                      />
                    : <span className="animate-pulse">|</span>
                }
            </h1>

            {/* Role */}
            <p
                className={`text-lg md:text-xl text-gray-300 font-medium mb-4 tracking-wide transition-all duration-700 ${enter}`}
                style={delay(300)}
            >
                Full-Stack &amp; Mobile Developer
            </p>

            {/* Description */}
            <p
                className={`text-sm md:text-base text-gray-500 max-w-lg mb-10 leading-relaxed transition-all duration-700 ${enter}`}
                style={delay(450)}
            >
                Computer Engineering graduate passionate about building modern web
                applications, automation systems, and scalable backend architectures.
                Working with React, .NET, and always exploring what&apos;s next.
            </p>

            {/* Buttons */}
            <div
                className={`flex gap-4 mb-8 transition-all duration-700 ${enter}`}
                style={delay(600)}
            >
                <button
                    onClick={() => scrollToSection("projects")}
                    className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:scale-105 transition"
                >
                    View Projects
                </button>
                <button
                    onClick={() => scrollToSection("contact")}
                    className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition backdrop-blur-md"
                >
                    Contact Me
                </button>
            </div>

            {/* Social links */}
            <div
                className={`flex gap-5 text-gray-500 transition-all duration-700 ${enter}`}
                style={delay(750)}
            >
                <a
                    href="https://github.com/falphir"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition text-xl"
                    aria-label="GitHub"
                >
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                    href="https://linkedin.com/in/tiago-costa-243024156"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition text-xl"
                    aria-label="LinkedIn"
                >
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
            </div>

            {/* Scroll indicator */}
            <button
                onClick={() => scrollToSection("education")}
                aria-label="Scroll down"
                className={`absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600 hover:text-gray-400 transition-all duration-700 animate-bounce ${enter}`}
                style={delay(1000)}
            >
                <FontAwesomeIcon icon={faChevronDown} className="text-lg" />
            </button>

        </section>
    );
}
