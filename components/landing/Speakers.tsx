const speakers = [
  {
    name: "Leye Falade",
    title: "Incoming CEO, Nigeria LNG Limited",
    session: "Fast-Tracking Your Career: Avoiding the Pitfalls That Slow You Down",
    bio: "A seasoned oil and gas executive with extensive global leadership experience across the energy sector. His session provides practical guidance on navigating complex corporate environments and positioning for accelerated leadership growth.",
    initials: "LF",
    color: "from-blue-700 to-blue-900",
  },
  {
    name: "Gbite Falade",
    title: "Business & Energy Industry Leader",
    session: "How to Build a World-Class Business",
    bio: "A respected leader with deep experience in engineering, operations, and corporate strategy. He will explore the operational discipline and strategic systems required to create globally competitive organizations.",
    initials: "GF",
    color: "from-teal-600 to-teal-800",
  },
  {
    name: "Kemi Adeosun",
    title: "Former Minister of Finance, Nigeria",
    session: "The Economics of Business",
    bio: "An economist known for her leadership in economic policy and financial reform. Her session examines how macroeconomic forces and financial discipline shape business strategy and sustainable enterprise growth.",
    initials: "KA",
    color: "from-blue-600 to-teal-700",
  },
  {
    name: "Tope Aladenusi",
    title: "Global Product Designer & Technology Leader",
    session: "Financial Decisions That Scale",
    bio: "A globally recognized product designer whose digital products have been used by millions worldwide. He offers insights on how founders and executives can make strategic financial decisions that support long-term value creation.",
    initials: "TA",
    color: "from-indigo-700 to-blue-800",
  },
  {
    name: "Segun Ola Zacchaeus",
    title: "Chief Economist & Strategy Advisor",
    session: "How Data Drives Business Decisions",
    bio: "An expert in data analytics and economic intelligence. His session explores how organizations can leverage data and analytics to make smarter strategic choices and maintain a competitive edge.",
    initials: "SOZ",
    color: "from-blue-800 to-indigo-900",
  },
  {
    name: "Rev. Lanre Oluseye",
    title: "Pastor & Leadership Teacher, House on the Rock",
    session: "A Seat at the Table, Not an Item on the Menu",
    bio: "An influential voice known for empowering individuals toward purposeful leadership and societal impact. He will challenge participants to move from passive participation to intentional leadership.",
    initials: "RLO",
    color: "from-teal-700 to-blue-700",
  },
];

export default function Speakers() {
  return (
    <section id="speakers" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">Featured Speakers</p>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
            World-Class Voices. Practical Insights.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.map((speaker) => (
            <div
              key={speaker.name}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Avatar / Header */}
              <div className={`bg-gradient-to-br ${speaker.color} p-8 flex items-center gap-4`}>
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-xl shrink-0">
                  {speaker.initials}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">{speaker.name}</h3>
                  <p className="text-white/70 text-sm mt-0.5">{speaker.title}</p>
                </div>
              </div>

              {/* Session */}
              <div className="p-6 space-y-3">
                <div className="bg-blue-50 rounded-xl px-4 py-3">
                  <p className="text-[11px] text-blue-500 font-semibold uppercase tracking-widest mb-1">Session</p>
                  <p className="text-blue-800 font-semibold text-sm leading-snug">&ldquo;{speaker.session}&rdquo;</p>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{speaker.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
