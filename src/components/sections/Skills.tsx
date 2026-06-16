import { useEffect, useRef, useState } from "react";
import { sanity } from "../../lib/Sanity.ts";

type Skill = {
    name: string;
    category: string;
    icon: string;
};

const CATEGORY_ORDER = ["language", "frontend", "backend", "mobile", "database", "tool"];

const CATEGORY_LABELS: Record<string, string> = {
    language: "Languages",
    frontend: "Frontend",
    backend: "Backend",
    mobile: "Mobile",
    database: "Database",
    tool: "Tools",
};

const CATEGORY_ACCENT: Record<string, { label: string; card: string }> = {
    language: {
        label: "text-indigo-400",
        card: "hover:border-indigo-400/40 hover:bg-indigo-500/5",
    },
    frontend: {
        label: "text-blue-400",
        card: "hover:border-blue-400/40 hover:bg-blue-500/5",
    },
    backend: {
        label: "text-green-400",
        card: "hover:border-green-400/40 hover:bg-green-500/5",
    },
    mobile: {
        label: "text-purple-400",
        card: "hover:border-purple-400/40 hover:bg-purple-500/5",
    },
    database: {
        label: "text-emerald-400",
        card: "hover:border-emerald-400/40 hover:bg-emerald-500/5",
    },
    tool: {
        label: "text-gray-400",
        card: "hover:border-white/30 hover:bg-white/5",
    },
};

const normalizeIconName = (name: string) =>
    name
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/\+/g, 'plus')
        .replace(/#/g, 'sharp')
        .replace(/\./g, '')
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]/g, '');

function SkillsSkeleton() {
    return (
        <div className="flex flex-col gap-12 animate-pulse">
            {[4, 6, 5].map((count, gi) => (
                <div key={gi}>
                    <div className="h-3 bg-white/10 rounded w-24 mb-4" />
                    <div className="flex flex-wrap gap-3">
                        {Array.from({ length: count }).map((_, i) => (
                            <div key={i} className="h-9 bg-white/10 rounded-xl w-24" />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function Skills() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [visibleGroups, setVisibleGroups] = useState<Set<string>>(new Set());
    const groupRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [headingVisible, setHeadingVisible] = useState(false);
    const headingRef = useRef<HTMLHeadingElement | null>(null);

    useEffect(() => {
        sanity
            .fetch<Skill[]>(`*[_type == "technology"] | order(name asc){ name, category, icon }`)
            .then((data) => { setSkills(data); setLoading(false); });
    }, []);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        const options = { threshold: 0.1 };

        if (headingRef.current) {
            const obs = new IntersectionObserver(
                ([entry]) => setHeadingVisible(entry.isIntersecting),
                options
            );
            obs.observe(headingRef.current);
            observers.push(obs);
        }

        Object.entries(groupRefs.current).forEach(([category, el]) => {
            if (!el) return;
            const obs = new IntersectionObserver(([entry]) => {
                setVisibleGroups((prev) => {
                    const next = new Set(prev);
                    if (entry.isIntersecting) next.add(category);
                    else next.delete(category);
                    return next;
                });
            }, options);
            obs.observe(el);
            observers.push(obs);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, [skills]);

    const grouped = CATEGORY_ORDER.reduce<Record<string, Skill[]>>((acc, cat) => {
        const items = skills.filter((s) => s.category === cat);
        if (items.length > 0) acc[cat] = items;
        return acc;
    }, {});

    return (
        <section id="skills" className="py-16 px-6 scroll-mt-24">
            <div className="max-w-5xl mx-auto">

                <h2
                    ref={headingRef}
                    className={`text-3xl font-bold text-center mb-14 transition-all duration-700
                        ${headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                >
                    Skills
                </h2>

                {loading ? <SkillsSkeleton /> : null}
                <div className={`flex flex-col gap-12 ${loading ? "hidden" : ""}`}>
                    {Object.entries(grouped).map(([category, items]) => {
                        const accent = CATEGORY_ACCENT[category] ?? CATEGORY_ACCENT.tool;
                        const visible = visibleGroups.has(category);

                        return (
                            <div
                                key={category}
                                ref={(el) => { groupRefs.current[category] = el; }}
                            >
                                {/* Category label */}
                                <p className={`text-xs font-semibold uppercase tracking-widest mb-4 ${accent.label}
                                    transition-all duration-500
                                    ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                                >
                                    {CATEGORY_LABELS[category]}
                                </p>

                                {/* Skill cards */}
                                <div className="flex flex-wrap gap-3">
                                    {items.map((skill, i) => (
                                        <div
                                            key={skill.name}
                                            style={{ transitionDelay: visible ? `${i * 50}ms` : "0ms" }}
                                            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl
                                                bg-white/5 border border-white/10
                                                ${accent.card}
                                                transition-all duration-400 cursor-default
                                                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                                        >
                                            <img
                                                src={`${import.meta.env.BASE_URL}icons/${normalizeIconName(skill.name)}.svg`}
                                                alt={skill.name}
                                                className="w-5 h-5 shrink-0"
                                            />
                                            <span className="text-sm text-gray-300 whitespace-nowrap">
                                                {skill.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
