import { useEffect, useState } from "react";
import {sanity} from "../../lib/Sanity.ts";

// const categoryColors = {
//     frontend: "text-cyan-400",
//     backend: "text-green-400",
//     database: "text-yellow-400",
//     tool: "text-gray-300",
//     language: "text-purple-400",
//     mobile: "text-pink-400",
// };

type Skill = {
    name: string;
    category: string;
    icon: string;
};

export default function Skills() {
    const [skills, setSkills] = useState<Skill[]>([]);

    useEffect(() => {
        const fetchSkills = async () => {
            const query = `*[_type == "technology"] | order(name asc){
                name,
                category,
                icon
            }`;

            const data = await sanity.fetch(query);
            setSkills(data);
        };

        fetchSkills();
    }, []);

    return (
        <section id="skills" className="py-16 px-6 flex items-center justify-center scroll-mt-24">
            <div className="text-center max-w-5xl w-full">

                <h2 className="text-3xl font-bold mb-10">Skills</h2>

                {/* scrolling / flex grid */}
                <div className="flex flex-wrap justify-center gap-8">

                    {skills.map((skill) => {
                        return (
                            <div
                                key={skill.name}
                                className="flex flex-col items-center gap-2 group"
                            >
                                {/* ICON */}
                                <img
                                    src={`${import.meta.env.BASE_URL}icons/${skill.icon}`}
                                    alt={skill.name}
                                    className="h-10 w-10 grayscale hover:grayscale-0 hover:scale-110 transition"
                                />
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}