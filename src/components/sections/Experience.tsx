import { useEffect, useState } from "react";
import {sanity} from "../../lib/Sanity.ts";
import Timeline from "../layout/Timeline.tsx";

type Technology = {
    name: string;
    category: "language" | "frontend" | "backend" | "mobile" | "database" | "tool";
};

type Experience = {
    company: string;
    type: string;
    role: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    description?: string[];

    technologies: Technology[];
};

export default function Experience() {
    const [experiences, setExperiences] = useState<Experience[]>([]);

    useEffect(() => {
        const fetchExperiences = async () => {
            const query = `*[_type == "experience"] | order(endDate desc) {
  company,
  role,
  startDate,
  endDate,
  description,
  technologies[]->{
    name,
    category
  },
  "type": select(
    type == "internship" => "Internship",
    type == "full-time" => "Full-Time",
    type == "part-time" => "Part-Time",
    type == "freelance" => "Freelance",
    type == "contract" => "Contract",
    "Full-Time"
  )
}`;

            const data = await sanity.fetch(query);
            setExperiences(data);
        };

        fetchExperiences();
    }, []);

    const timelineData = experiences.map((item) => ({
        startDate: item.startDate,
        endDate: item.endDate,
        title: item.role + " at " + item.company,
        subtitle: item.type,
        description: item.description,
        technologies: item.technologies
    }));

    return (
        <section id="experience" className="py-12 px-6 scroll-mt-24">
            <div className="w-full max-w-7xl mx-auto items-center">

                <h2 className="text-3xl font-bold text-center mb-12">
                    Professional Experience
                </h2>

                <Timeline items={timelineData} />

            </div>
        </section>
    );

}
