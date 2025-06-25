import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-800 text-slate-200 font-sans">
      {/* Hero Section */}
      <section className="py-24 px-6 text-center bg-gradient-to-b from-slate-900 to-slate-800">
        <h1 className="nar text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#f43f5e] mb-6" >
          Narratia
        </h1>



        <p className="text-xl max-w-3xl mx-auto text-slate-300">
          A futuristic, context-aware storytelling platform where writers collaborate to shape immersive, dynamic narratives—one character at a time.
        </p>
        <div className="mt-10">
          <button className="px-6 py-3 rounded border border-white text-white hover:bg-white/10 transition">
            Start Writing
          </button>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid gap-16 md:grid-cols-3 text-center">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-white mb-4">Collaborative Writing</h2>
          <p className="text-slate-400">
            Co-create narratives with your team. Assign characters, arcs, and branches collaboratively.
          </p>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-white mb-4">Adaptive Story Engine</h2>
          <p className="text-slate-400">
            Focus on what matters—your characters. We'll reshape and adapt the story structure around them.
          </p>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-white mb-4">Multi-Format Export</h2>
          <p className="text-slate-400">
            Export to screenplay, web novels, or interactive scripts—all from a single, unified system.
          </p>
        </div>
      </section>

      {/* Character-Centric Writing */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Write Through Characters, Not Pages
        </h2>
        <p className="max-w-3xl mx-auto text-slate-300 text-lg">
          Add characters and define their traits. Our engine will weave them into the story seamlessly—without breaking the flow or your creativity.
        </p>
      </section>

      <section className="py-24 px-6 text-center bg-gradient-to-b  from-slate-800 to-slate-900">
        <h2 className="text-3xl font-semibold text-white mb-4">Visualize Every Connection</h2>
        <p className="max-w-2xl mx-auto text-slate-300 mb-10">
          Understand your story structure at a glance. Our visual graph engine shows live character relationships and impact paths.
        </p>
        <div className="w-full max-w-4xl h-[300px] mx-auto bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center text-slate-500 italic">
          Character Graph Preview (Coming Soon)
        </div>
      </section>
    </div>
  );
};

export { Home };
