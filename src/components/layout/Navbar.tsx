import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const navLinksRef = useRef<HTMLDivElement>(null);
    const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
    const [dotX, setDotX] = useState<number | null>(null);

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
    }, [pathname]);

    const displayActive = pathname === "/" ? active : "";

    // Measure the center-X of the active link relative to the container
    useEffect(() => {
        const linkEl = displayActive ? linkRefs.current.get(displayActive) : null;
        const containerEl = navLinksRef.current;
        if (!linkEl || !containerEl) return;

        const containerRect = containerEl.getBoundingClientRect();
        const linkRect = linkEl.getBoundingClientRect();
        setDotX(linkRect.left - containerRect.left + linkRect.width / 2);
    }, [displayActive]);

    const handleNavClick = (e: React.MouseEvent, id: string) => {
        if (pathname !== "/") {
            e.preventDefault();
            navigate({ pathname: "/", hash: `#${id}` });
        }
    };

    const navLinkClass = (id: string) =>
        `hover:text-white transition-colors duration-300 ${
            displayActive === id ? "text-white" : "text-gray-400"
        }`;

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="text-white font-bold text-lg">
                    Tiago<span className="text-indigo-400">.dev</span>
                </Link>

                {/* Desktop links */}
                <div ref={navLinksRef} className="hidden md:flex items-center gap-6 text-sm relative">
                    {SECTIONS.map((id) => (
                        <a
                            key={id}
                            ref={(el) => {
                                if (el) linkRefs.current.set(id, el);
                                else linkRefs.current.delete(id);
                            }}
                            href={`#${id}`}
                            onClick={(e) => handleNavClick(e, id)}
                            className={navLinkClass(id)}
                        >
                            {LABELS[id]}
                        </a>
                    ))}

                    {/* Sliding dot */}
                    <span
                        className="absolute -bottom-[17px] left-0 w-1 h-1 rounded-full bg-indigo-400 pointer-events-none"
                        style={{
                            transform: `translateX(calc(${dotX ?? 0}px - 50%))`,
                            opacity: dotX !== null && displayActive ? 1 : 0,
                            transition: dotX !== null
                                ? "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease"
                                : "none",
                        }}
                    />
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
                            onClick={(e) => { handleNavClick(e, id); setOpen(false); }}
                            className={navLinkClass(id)}
                        >
                            {LABELS[id]}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
}
