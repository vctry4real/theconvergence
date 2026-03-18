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
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">About the Conference</p>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
            A Premier Leadership &amp; Business Conference
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            The Convergence is designed to equip entrepreneurs, professionals, executives, and scaling businesses
            with the insight, strategy, and networks required to thrive in an evolving global economy.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mt-4">
            Through keynote sessions and strategic conversations, participants gain actionable perspectives on how to
            build resilient organizations, accelerate professional growth, make sound financial decisions, and position
            themselves for long-term relevance and impact.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center mb-4">
                {pillar.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{pillar.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* Who attends */}
        <div className="bg-blue-700 rounded-3xl p-10 lg:p-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-teal-300 font-semibold text-sm tracking-widest uppercase mb-3">Who Should Attend</p>
            <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight">
              Built for Leaders Who Are Scaling
            </h3>
          </div>
          <ul className="space-y-4">
            {audience.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-blue-100">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
