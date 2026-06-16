import { useEffect, useState } from "react";

const SECTIONS = ["home", "projects", "experience", "education", "contact"] as const;
const LABELS: Record<string, string> = {
    home: "Home",
    projects: "Projects",
    experience: "Experience",
    education: "Education",
    contact: "Contact",
};

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("home");

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        SECTIONS.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActive(id); },
                { rootMargin: "-40% 0px -55% 0px" }
            );
            obs.observe(el);
            observers.push(obs);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const linkClass = (id: string) =>
        `hover:text-white transition ${active === id ? "text-white" : "text-gray-400"}`;

    const activeDot = (id: string) =>
        active === id
            ? "after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-indigo-400"
            : "";

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <div className="text-white font-bold text-lg">
                    Tiago<span className="text-indigo-400">.dev</span>
                </div>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-6 text-sm">
                    {SECTIONS.map((id) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            className={`relative ${linkClass(id)} ${activeDot(id)}`}
                        >
                            {LABELS[id]}
                        </a>
                    ))}
                </div>

                {/* Mobile button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-white text-xl leading-none"
                    aria-label="Toggle menu"
                >
                    {open ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-sm border-t border-white/5 pt-3">
                    {SECTIONS.map((id) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            className={linkClass(id)}
                            onClick={() => setOpen(false)}
                        >
                            {LABELS[id]}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
}
