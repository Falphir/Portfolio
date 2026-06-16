import { useEffect, useState } from "react";
import {sanity} from "../../lib/Sanity.ts";
import Timeline from "../layout/Timeline.tsx";

type Technology = {
    name: string;
    category: "language" | "frontend" | "backend" | "mobile" | "database" | "tool";
};

type Education = {
    institution: string;
    degreeLabel: string;
    field: string;
    startDate: string;
    endDate: string;
    description?: string;

    technologies: Technology[];
};

export default function Education() {
    const [educations, setEducations] = useState<Education[]>([]);

    useEffect(() => {
        const fetchEducations = async () => {
            const query = `*[_type == "education"] | order(endDate desc) {
  institution,
  startDate,
  endDate,
  description,

  technologies[]->{
    name,
    category
  },

  "degreeLabel": select(
    degree == "ctesp" => "Higher Professional Technical Course (CTeSP)",
    degree == "bachelor" => "Bachelor's Degree",
    degree == "master" => "Master's Degree",
    degree == "doctorate" => "Doctorate",
    "Bachelor's Degree" // default value
  ) + " in " + coalesce(
    field
  ),
}`;

            const data = await sanity.fetch(query);
            setEducations(data);
        };

        fetchEducations();
    }, []);

    const timelineData = educations.map((item) => ({
        startDate: item.startDate,
        endDate: item.endDate,
        title: item.degreeLabel,
        subtitle: item.institution,
        description: item.description ? [item.description] : undefined,
        technologies: item.technologies
    }));

    return (
        <section id="education" className="py-12 px-6 scroll-mt-24">
            <div className="w-full max-w-7xl mx-auto items-center">

                <h2 className="text-3xl font-bold text-center mb-12">
                    Education
                </h2>

                <Timeline items={timelineData} />

            </div>
        </section>
    );

}
