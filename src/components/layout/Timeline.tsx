import TimelineCard, { type TimelineItem } from "../ui/TimelineCard";

type Props = {
    items: TimelineItem[];
};

export default function Timeline({ items }: Props) {
    return (
        <div className="relative max-w-5xl mx-auto">

            {/* Timeline line */}
            <div
                className="
                    absolute left-4 md:left-1/2
                    top-0 h-full w-[2px]
                    md:-translate-x-1/2
                    bg-gradient-to-b from-indigo-500/30 via-purple-500/20 to-transparent
                "
            />

            <div className="space-y-10 md:space-y-16">
                {items.map((item, index) => {
                    const isLeft = index % 2 === 0;

                    return (
                        <div
                            key={index}
                            className="relative flex md:items-center w-full"
                        >
                            {/* Dot */}
                            <div
className="
    absolute left-4 md:left-1/2
    top-12 md:top-auto
    w-4 h-4 rounded-full
    bg-indigo-500
    shadow-[0_0_18px_rgba(99,102,241,0.9)]
    z-10

    -translate-x-1/2
    md:-translate-x-1/2
"
/>

                            {/* MOBILE */}
                            <div className="w-full md:hidden py-2 pl-14">
                                <TimelineCard item={item} />
                            </div>

                            {/* DESKTOP LEFT */}
                            <div className="hidden md:flex w-1/2 pr-10 justify-end">
                                {isLeft && (
                                    <TimelineCard item={item} align="right" />
                                )}
                            </div>

                            {/* DESKTOP RIGHT */}
                            <div className="hidden md:flex w-1/2 pl-10 justify-start">
                                {!isLeft && (
                                    <TimelineCard item={item} align="left" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}