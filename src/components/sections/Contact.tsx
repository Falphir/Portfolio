export default function Contact() {
    return (
        <section id="contact" className="py-12 px-6 flex items-center justify-center scroll-mt-24">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Contact</h2>

                <p className="text-gray-400 mb-6">
                    Want to work together? Reach out below.
                </p>

                <a
                    href="mailto:youremail@example.com"
                    className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:scale-105 transition inline-block"
                >
                    Send Email
                </a>
            </div>
        </section>
    );
}