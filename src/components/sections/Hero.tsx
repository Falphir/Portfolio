export default function Hero() {
    return (
        <section id="home" className="h-screen flex flex-col justify-center items-center text-center px-6 scroll-mt-24">

            {/* Badge */}
            <div className="mb-6 px-4 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 backdrop-blur-md">
                Available for opportunities
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
                    Tiago
                </span>{" "}
                👋
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-8">
                Computer Engineering Student & Developer focused on building clean,
                modern and scalable web applications.
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
                <button className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:scale-105 transition">
                    View Projects
                </button>

                <button className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition backdrop-blur-md">
                    Contact Me
                </button>
            </div>

        </section>
    )
}