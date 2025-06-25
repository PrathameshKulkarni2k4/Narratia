import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans px-6 pt-20 pb-12">
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Narratia</h1>
        <p className="text-lg text-slate-400">
          Narratia is a collaborative, context-aware storytelling platform designed to revolutionize
          how stories are written, evolved, and visualized.
        </p>
      </section>

      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 text-slate-300">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">Why We Built Narratia</h2>
          <p className="leading-relaxed text-slate-400">
            Traditional storytelling can be rigid—especially when it comes to collaboration. Adding
            a new character or arc often requires manually rewriting large portions of content.
            Narratia eliminates this friction by using context-adaptive intelligence that reshapes
            the narrative to fit new inputs seamlessly.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">What Makes Us Different</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-400">
            <li>Character-driven adaptive engine that updates the plot for you</li>
            <li>Real-time collaboration between writers and teams</li>
            <li>Story export in multiple formats: article, screenplay, script</li>
            <li>Graph-based visualization for character relationships</li>
          </ul>
        </div>
      </section>

      <section className="max-w-4xl mx-auto mt-20 text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">Our Vision</h2>
        <p className="text-lg text-slate-400">
          We envision a future where writing becomes a collaborative craft powered by AI tools, where
          storytellers can focus on emotions, characters, and creativity—while the structure follows
          intelligently.
        </p>
      </section>
    </div>
  );
};

export { About };
