import ContactForm from "../layout/ContactForm.tsx";


export default function Contact() {
    return (
        <section id="contact" className="py-12 px-6 flex items-center justify-center scroll-mt-24">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Contact</h2>

                <p className="text-gray-400 mb-6">
                    Want to work together? Reach out below.
                </p>

                <ContactForm />
            </div>
        </section>
    );
}