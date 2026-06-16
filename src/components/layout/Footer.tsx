import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 py-8 px-6 mt-16">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">

                <span>© {new Date().getFullYear()} Tiago Costa</span>

                <div className="flex gap-5">
                    <a
                        href="https://github.com/falphir"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        className="hover:text-white transition text-base"
                    >
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a
                        href="https://linkedin.com/in/tiago-costa-243024156"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        className="hover:text-white transition text-base"
                    >
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                </div>

                <span>Built with React &amp; Sanity</span>

            </div>
        </footer>
    );
}
