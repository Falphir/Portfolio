import { useEffect, useRef, useState } from "react";
import ContactForm from "../layout/ContactForm.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        const obs = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    const fadeUp = `transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`;
    const delay = (ms: number) => ({ transitionDelay: visible ? `${ms}ms` : "0ms" });

    return (
        <section ref={sectionRef} id="contact" className="py-20 px-6 scroll-mt-24">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                {/* Left — info */}
                <div>
                    <h2
                        className={`text-3xl font-bold mb-4 ${fadeUp}`}
                        style={delay(0)}
                    >
                        Let's work together
                    </h2>

                    <p
                        className={`text-gray-400 leading-relaxed mb-8 ${fadeUp}`}
                        style={delay(150)}
                    >
                        I'm currently open to new opportunities — whether it's a full-time
                        role, freelance project, or just a chat. Drop me a message and
                        I'll get back to you as soon as possible.
                    </p>

                    <div
                        className={`flex flex-col gap-4 ${fadeUp}`}
                        style={delay(300)}
                    >
                        <a
                            href="mailto:tiagofteixeiracosta@gmail.com"
                            className="flex items-center gap-3 text-gray-400 hover:text-white transition group"
                        >
                            <span className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-indigo-400/40 transition">
                                <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
                            </span>
                            tiagofteixeiracosta@gmail.com
                        </a>

                        <a
                            href="https://github.com/falphir"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-3 text-gray-400 hover:text-white transition group"
                        >
                            <span className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-indigo-400/40 transition">
                                <FontAwesomeIcon icon={faGithub} className="text-sm" />
                            </span>
                            github.com/falphir
                        </a>

                        <a
                            href="https://linkedin.com/in/tiago-costa-243024156"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-3 text-gray-400 hover:text-white transition group"
                        >
                            <span className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-indigo-400/40 transition">
                                <FontAwesomeIcon icon={faLinkedin} className="text-sm" />
                            </span>
                            linkedin.com/in/tiago-costa
                        </a>
                    </div>
                </div>

                {/* Right — form */}
                <div className={fadeUp} style={delay(200)}>
                    <ContactForm />
                </div>
            </div>
        </section>
    );
}
