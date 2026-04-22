import { useEffect, useState } from "react";

export default function Hero() {
    const prefix = "Hi, I'm ";
    const name = "Tiago";
    const emoji = " 👋";

    const scrollToProjects = () => {
        document.getElementById("projects")?.scrollIntoView({
            behavior: "smooth",
        });
    };

    const fullText = prefix + name + emoji;

    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index >= fullText.length) return;

        const timeout = setTimeout(() => {
            setIndex((prev) => prev + 1);
        }, 100);

        return () => clearTimeout(timeout);
    }, [index]);

    const current = fullText.slice(0, index);

    const typedPrefix = current.slice(0, prefix.length);
    const typedName = current.slice(prefix.length, prefix.length + name.length);
    const typedEmoji = current.slice(prefix.length + name.length);

    return (
        <section className="h-screen flex flex-col justify-center items-center text-center px-6">

            {/* Badge */}
            <div className="mb-6 px-4 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 backdrop-blur-md">
                Open to opportunities
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                {typedPrefix}
                <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
                    {typedName}
                </span>
                {typedEmoji}
                <span className="animate-pulse">|</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-8">
                Computer Engineering graduate focused on building clean, modern and
                scalable web & mobile applications.
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
                <button onClick={scrollToProjects} className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:scale-105 transition">
                    View Projects
                </button>

                <button className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition backdrop-blur-md">
                    Contact Me
                </button>
            </div>

        </section>
    );
}