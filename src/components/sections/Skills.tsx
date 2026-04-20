export default function Skills() {
    return (
        <section id="skills" className="py-12 px-6 flex items-center justify-center scroll-mt-24">
            <div className="text-center max-w-3xl">
                <h2 className="text-3xl font-bold mb-6">Skills</h2>

                <div className="flex flex-wrap justify-center gap-3">
                    {[
                        "React",
                        "TypeScript",
                        ".NET",
                        "Node.js",
                        "SQL",
                        "Docker",
                        "Tailwind",
                    ].map((skill) => (
                        <span
                            key={skill}
                            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}