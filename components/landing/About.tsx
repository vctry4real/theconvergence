export default function About() {
  const pillars = [
    {
      title: "Career Acceleration",
      description: "Practical guidance on navigating complex corporate environments and building strategic influence.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: "Enterprise Growth",
      description: "Operational discipline, leadership mindset, and strategic systems required to build globally competitive organizations.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: "Economic Intelligence",
      description: "How macroeconomic forces, fiscal policy, and financial discipline shape business strategy and investment decisions.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: "Data-Driven Strategy",
      description: "Leveraging analytics and economic insight to make smarter strategic choices and maintain a competitive edge.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
    },
  ];

  const audience = [
    "Entrepreneurs and startup founders building scalable ventures",
    "Professionals and mid-career leaders navigating growth and leadership transitions",
    "Senior executives and business leaders shaping organizational strategy",
    "Companies seeking sustainable expansion and global competitiveness",
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12 sm:mb-16 grid lg:grid-cols-2 gap-8 sm:gap-10 items-end">
          <div>
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className="w-8 h-px bg-teal-500" />
              <p className="text-teal-500 font-bold text-xs tracking-[0.3em] uppercase">About the Conference</p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-gray-900 leading-[1.05]">
              A Premier<br />
              <span className="text-teal-600">Leadership</span> &amp;<br />
              Business Conference
            </h2>
          </div>
          <div className="space-y-4 sm:space-y-5 lg:pb-2">
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed border-l-2 border-teal-100 pl-4 sm:pl-5">
              The Convergence is designed to equip entrepreneurs, professionals, executives, and scaling businesses
              with the insight, strategy, and networks required to thrive in an evolving global economy.
            </p>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed border-l-2 border-teal-100 pl-4 sm:pl-5">
              Through keynote sessions and strategic conversations, participants gain actionable perspectives on how to
              build resilient organizations, accelerate professional growth, make sound financial decisions, and position
              themselves for long-term relevance and impact.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14 sm:mb-20">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-4">
                {pillar.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{pillar.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* Who attends */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gray-900">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-teal-600 rounded-full opacity-30 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-teal-500 rounded-full opacity-20 blur-3xl" />

          <div className="relative z-10 p-6 sm:p-10 lg:p-14 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <span className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase text-teal-400 bg-teal-400/10 border border-teal-400/20 px-3 py-1 rounded-full mb-4 sm:mb-5">
                Who Should Attend
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white leading-tight mb-4 sm:mb-6">
                Built for Leaders<br />
                <span className="text-teal-400">Who Are Scaling</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Convergence is curated — not open to everyone. It gathers the professionals
                and business leaders already in motion and ready for the next level.
              </p>
            </div>

            <ul className="space-y-2 sm:space-y-3">
              {audience.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start sm:items-center gap-3 sm:gap-4 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 backdrop-blur-sm hover:bg-white/10 transition-colors"
                >
                  <span className="text-xs font-black text-teal-400/60 w-5 shrink-0 tabular-nums mt-0.5 sm:mt-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="w-px h-4 sm:h-6 bg-white/10 shrink-0" />
                  <span className="text-white/80 text-sm font-medium leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
