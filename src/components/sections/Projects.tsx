import { useEffect, useRef, useState } from "react";
import {sanity} from "../../lib/Sanity.ts";
import Badge from "../ui/Badge.tsx";
import RepoDropdown from "../ui/RepoDropdown.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";

type Repository = {
    name: string;
    url: string;
    type: "frontend" | "backend" | "mobile" | "other";
};

type Technology = {
    name: string;
    category: "language" | "frontend" | "backend" | "mobile" | "database" | "tool";
};

type Project = {
    title: string;
    slug: { current: string };
    description: string;
    featured: boolean;
    keyFeatures: string[];
    architectureType: "single" | "modular" | "multi-repo";
    platforms: string[];
    imageUrl?: string;
    repositories: Repository[];
    technologies: Technology[];
};

function ProjectSkeleton() {
    return (
        <div className="max-w-sm mx-auto w-full rounded-xl bg-white/5 border border-white/10 flex flex-col animate-pulse">
            <div className="w-full h-48 bg-white/10 rounded-t-xl" />
            <div className="p-6 flex flex-col gap-3">
                <div className="h-5 bg-white/10 rounded w-2/3" />
                <div className="h-3 bg-white/10 rounded w-full" />
                <div className="h-3 bg-white/10 rounded w-5/6" />
                <div className="h-3 bg-white/10 rounded w-4/6" />
                <div className="flex gap-2 mt-2">
                    <div className="h-6 bg-white/10 rounded-full w-16" />
                    <div className="h-6 bg-white/10 rounded-full w-20" />
                    <div className="h-6 bg-white/10 rounded-full w-14" />
                </div>
            </div>
        </div>
    );
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRepo, setSelectedRepo] = useState<Record<number, number>>({});
    const [openRepoDropdown, setOpenRepoDropdown] = useState<number | null>(null);
    const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const [headingVisible, setHeadingVisible] = useState(false);

    const defaultImage = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80";

    useEffect(() => {
        const fetchProjects = async () => {
            const query = `*[_type == "project"] | order(publishedAt desc){
                        title,
                        slug,
                        description,
                        featured,
                        keyFeatures,
                        architectureType,
                        platforms,
                        "imageUrl": image.asset->url,
                    
                        repositories[]{
                            name,
                            url,
                            type
                        },
                    
                        demoUrl,
                    
                        technologies[]->{
                            name,
                            category
                        }
                    }`;

            const data = await sanity.fetch(query);
            setProjects(data);
            setLoading(false);
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        const options = { threshold: 0.1 };

        cardRefs.current.forEach((el, i) => {
            if (!el) return;
            const obs = new IntersectionObserver(([entry]) => {
                setVisibleCards((prev) => {
                    const next = new Set(prev);
                    if (entry.isIntersecting) next.add(i);
                    else next.delete(i);
                    return next;
                });
            }, options);
            obs.observe(el);
            observers.push(obs);
        });

        if (headingRef.current) {
            const obs = new IntersectionObserver(
                ([entry]) => setHeadingVisible(entry.isIntersecting),
                options
            );
            obs.observe(headingRef.current);
            observers.push(obs);
        }

        return () => observers.forEach((o) => o.disconnect());
    }, [projects]);

    return (
        <section id="projects" className="py-12 px-6 scroll-mt-24">
            <div className="w-full max-w-7xl mx-auto items-center">

                <h2
                    ref={headingRef}
                    className={`text-3xl font-bold text-center mb-12 transition-all duration-700 ${
                        headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                >
                    Projects
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
                    {loading
                        ? Array.from({ length: 3 }).map((_, i) => <ProjectSkeleton key={i} />)
                        : projects.map((project, i) => (
                        <div
                            key={i}
                            ref={(el) => { cardRefs.current[i] = el; }}
                            style={{ transitionDelay: `${(i % 3) * 100}ms` }}
                            className={`max-w-sm mx-auto w-full h-full rounded-xl bg-white/5 border border-white/10 flex flex-col
                                        hover:bg-white/10 hover:border-indigo-400/40
                                        hover:shadow-[0_0_25px_rgba(99,102,241,0.20),0_0_60px_rgba(59,130,246,0.08)]
                                        transition-all duration-500 ease-out
                                        ${visibleCards.has(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                        >
                            {/* Image */}
                            {project.imageUrl ? (
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-48 object-cover rounded-t-xl"
                                />
                            ) : (
                                <img
                                    src={defaultImage}
                                    alt="Default project preview"
                                    className="w-full h-48 object-cover opacity-80 rounded-t-xl"
                                />
                            )}

                            <div className="p-6 flex flex-col flex-1">
                                {/* Title */}
                                <h3 className="text-xl font-semibold mb-2">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-400 text-sm mb-4 line-clamp-4 overflow-hidden text-left">
                                    {project.description}
                                </p>

                                {/* Key features */}
                                {project.keyFeatures?.length > 0 && ( <ul className="text-sm text-gray-300 mb-4 list-disc pl-4"> {project.keyFeatures.slice(0, 3).map((f, i) => ( <li key={i}>{f}</li> ))} </ul> )}

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies?.map((t) => (
                                        <Badge key={t.name} category={t.category}>
                                            {t.name}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="mt-auto pt-4 flex gap-3">

                                    {/* Repositories */}
                                    {project.repositories?.length > 0 && (() => {
                                        const repos = project.repositories;
                                        const selectedIndex = selectedRepo[i] ?? 0;
                                        const selected = repos[selectedIndex];

                                        if (repos.length === 1) {
                                            return (
                                                <a
                                                    href={selected.url}
                                                    target="_blank"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="px-3 py-1 text-xs rounded-md border border-white/20 hover:bg-white/10 transition"
                                                >
                                                    {selected.name}
                                                    <FontAwesomeIcon
                                                        icon={faArrowUpRightFromSquare}
                                                        className="text-xs ml-2 opacity-60 group-hover:opacity-100 transition"
                                                    />
                                                </a>
                                            );
                                        }

                                        return (
                                            <div className="relative inline-flex border border-white/20 rounded-md">

                                                {/* MAIN BUTTON */}
                                                <a
                                                    href={selected?.url}
                                                    target="_blank"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="px-3 py-1 text-xs hover:bg-white/10 transition flex items-center"
                                                >
                                                    {selected?.name}
                                                    <FontAwesomeIcon
                                                        icon={faArrowUpRightFromSquare}
                                                        className="text-xs ml-2 opacity-60 group-hover:opacity-100 transition"
                                                    />
                                                </a>

                                                <div className="w-px bg-white/10" />

                                                {/* DROPDOWN BUTTON */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setOpenRepoDropdown(openRepoDropdown === i ? null : i);
                                                    }}
                                                    className="px-2 py-1 text-xs hover:bg-white/10 transition flex items-center"
                                                >
                                                    <svg
                                                        className={`w-3 h-3 transition-transform ${
                                                            openRepoDropdown === i ? "rotate-180" : ""
                                                        }`}
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </button>

                                                {/* DROPDOWN COMPONENT */}
                                                <RepoDropdown
                                                    open={openRepoDropdown === i}
                                                    repos={repos}
                                                    selectedIndex={selectedIndex}
                                                    onSelect={(realIndex: number) => {
                                                        setSelectedRepo((prev) => ({
                                                            ...prev,
                                                            [i]: realIndex,
                                                        }));
                                                        setOpenRepoDropdown(null);
                                                    }}
                                                />
                                            </div>
                                        );
                                    })()}
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );

}
