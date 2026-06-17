import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { sanity } from "../lib/Sanity.ts";
import Badge from "../components/ui/Badge.tsx";
import ImageGallery from "../components/ui/ImageGallery.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const CATEGORY_ORDER = ["language", "frontend", "backend", "mobile", "database", "tool"] as const;

const CATEGORY_LABELS: Record<string, string> = {
    language: "Languages",
    frontend: "Frontend",
    backend: "Backend",
    mobile: "Mobile",
    database: "Database",
    tool: "Tools",
};

const CATEGORY_LABEL_COLOR: Record<string, string> = {
    language: "text-indigo-400",
    frontend: "text-blue-400",
    backend: "text-green-400",
    mobile: "text-purple-400",
    database: "text-emerald-400",
    tool: "text-gray-400",
};

type Repository = { name: string; url: string; type: string };
type Technology = {
    name: string;
    category: "language" | "frontend" | "backend" | "mobile" | "database" | "tool";
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PortableTextBlock = any[];

type Project = {
    title: string;
    slug: { current: string };
    description: string;
    body?: PortableTextBlock;
    featured: boolean;
    keyFeatures: string[];
    architectureType: string;
    platforms: string[];
    imageUrl?: string;
    gallery?: string[];
    repositories: Repository[];
    demoUrl?: string;
    technologies: Technology[];
};

const bodyComponents: PortableTextComponents = {
    block: {
        normal: ({ children }) => <p className="text-gray-300 leading-relaxed text-[15px] mb-4">{children}</p>,
        h2: ({ children }) => <h2 className="text-base font-semibold uppercase tracking-wider text-indigo-300 mb-3 mt-8">{children}</h2>,
        h3: ({ children }) => <h3 className="text-[15px] font-semibold text-white mb-2 mt-5">{children}</h3>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-indigo-400/50 pl-4 text-gray-400 italic my-4">{children}</blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="space-y-1.5 mb-4 ml-1">{children}</ul>,
        number: ({ children }) => <ol className="space-y-1.5 mb-4 ml-1 list-decimal list-inside">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => (
            <li className="flex items-start gap-2.5 text-gray-300 text-[15px]">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                <span>{children}</span>
            </li>
        ),
        number: ({ children }) => <li className="text-gray-300 text-[15px]">{children}</li>,
    },
    marks: {
        strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic text-gray-200">{children}</em>,
        code: ({ children }) => (
            <code className="px-1.5 py-0.5 rounded bg-white/10 text-indigo-300 text-sm font-mono">{children}</code>
        ),
        link: ({ value, children }) => (
            <a
                href={value?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300 transition"
            >
                {children}
            </a>
        ),
    },
};

function DetailSkeleton() {
    return (
        <div className="animate-pulse space-y-8">
            <div className="w-full h-72 md:h-96 rounded-2xl bg-white/10" />
            <div className="space-y-3">
                <div className="h-8 bg-white/10 rounded w-1/2" />
                <div className="h-4 bg-white/10 rounded w-1/4" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-4">
                    <div className="h-4 bg-white/10 rounded w-full" />
                    <div className="h-4 bg-white/10 rounded w-5/6" />
                    <div className="h-4 bg-white/10 rounded w-4/6" />
                </div>
                <div className="h-40 bg-white/10 rounded-xl" />
            </div>
        </div>
    );
}

export default function ProjectDetail() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);
    const [fetchedSlug, setFetchedSlug] = useState<string | null>(null);

    // Derived — avoids synchronous setState inside the effect body
    const loading = fetchedSlug !== slug;

    useEffect(() => {
        if (!slug) return;
        window.scrollTo(0, 0);
        let cancelled = false;
        sanity
            .fetch<Project>(
                `*[_type == "project" && slug.current == $slug][0]{
                    title,
                    slug,
                    description,
                    featured,
                    keyFeatures,
                    architectureType,
                    platforms,
                    "imageUrl": image.asset->url,
                    "gallery": gallery[].asset->url,
                    body,
                    repositories[]{ name, url, type },
                    demoUrl,
                    technologies[]->{ name, category }
                }`,
                { slug }
            )
            .then((data) => {
                if (cancelled) return;
                setProject(data ?? null);
                setFetchedSlug(slug);
            });
        return () => { cancelled = true; };
    }, [slug]);

    const allImages = [
        project?.imageUrl,
        ...(project?.gallery ?? []),
    ].filter(Boolean) as string[];

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="max-w-5xl mx-auto px-6">

                {/* Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm mb-8 group"
                >
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="group-hover:-translate-x-0.5 transition-transform"
                    />
                    Back
                </button>

                {loading ? (
                    <DetailSkeleton />
                ) : !project ? (
                    <div className="text-center text-gray-400 py-24">Project not found.</div>
                ) : (
                    <>
                        {/* Hero image */}
                        {project.imageUrl && (
                            <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Title + meta */}
                        <div className="mb-10">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
                                {project.featured && (
                                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                                        Featured
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.architectureType && (
                                    <span className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 capitalize">
                                        {project.architectureType}
                                    </span>
                                )}
                                {project.platforms?.map((p) => (
                                    <span
                                        key={p}
                                        className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 capitalize"
                                    >
                                        {p}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                            {/* Main content */}
                            <div className="lg:col-span-2 space-y-10">

                                {/* Description */}
                                <section>
                                    <h2 className="text-base font-semibold uppercase tracking-wider text-indigo-300 mb-3">
                                        About
                                    </h2>
                                    <p className="text-gray-300 leading-relaxed text-[15px]">
                                        {project.description}
                                    </p>
                                </section>

                                {/* Body (rich text) */}
                                {project.body && project.body.length > 0 && (
                                    <section>
                                        <PortableText
                                            value={project.body}
                                            components={bodyComponents}
                                        />
                                    </section>
                                )}

                                {/* Key Features */}
                                {project.keyFeatures?.length > 0 && (
                                    <section>
                                        <h2 className="text-base font-semibold uppercase tracking-wider text-indigo-300 mb-4">
                                            Key Features
                                        </h2>
                                        <ul className="space-y-3">
                                            {project.keyFeatures.map((f, i) => (
                                                <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )}

                                {/* Gallery */}
                                {allImages.length > 0 && (
                                    <section>
                                        <h2 className="text-base font-semibold uppercase tracking-wider text-indigo-300 mb-4">
                                            Gallery
                                        </h2>
                                        <ImageGallery images={allImages} altPrefix={project.title} />
                                    </section>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-5">

                                {/* Links */}
                                {(project.repositories?.length > 0 || project.demoUrl) && (
                                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                                            Links
                                        </h2>
                                        <div className="flex flex-col gap-2">
                                            {project.demoUrl && (
                                                <a
                                                    href={project.demoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-indigo-500/10 border border-indigo-400/20 hover:bg-indigo-500/20 transition text-sm text-indigo-300"
                                                >
                                                    Live Demo
                                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs opacity-60" />
                                                </a>
                                            )}
                                            {project.repositories?.map((repo) => (
                                                <a
                                                    key={repo.name}
                                                    href={repo.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition text-sm text-gray-300"
                                                >
                                                    {repo.name}
                                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs opacity-60" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Tech Stack */}
                                {project.technologies?.length > 0 && (
                                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                                            Tech Stack
                                        </h2>
                                        <div className="flex flex-col gap-4">
                                            {CATEGORY_ORDER
                                                .map(cat => ({
                                                    cat,
                                                    items: project.technologies.filter(t => t.category === cat),
                                                }))
                                                .filter(({ items }) => items.length > 0)
                                                .map(({ cat, items }) => (
                                                    <div key={cat}>
                                                        <p className={`text-[10px] font-semibold uppercase tracking-widest mb-2 ${CATEGORY_LABEL_COLOR[cat]}`}>
                                                            {CATEGORY_LABELS[cat]}
                                                        </p>
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {items.map(t => (
                                                                <Badge key={t.name} category={t.category}>
                                                                    {t.name}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )}

                                {/* Platforms */}
                                {project.platforms?.length > 0 && (
                                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                                            Platforms
                                        </h2>
                                        <div className="flex flex-wrap gap-2">
                                            {project.platforms.map((p) => (
                                                <span
                                                    key={p}
                                                    className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 capitalize"
                                                >
                                                    {p}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
