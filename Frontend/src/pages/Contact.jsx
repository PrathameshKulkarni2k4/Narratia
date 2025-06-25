import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans px-6 pt-20 pb-12">
      {/* Header Section */}
      <section className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-lg text-slate-400">
          Whether you have a question, feedback, or just want to say hello—we're here to listen.
          Reach out to the Narratia team anytime.
        </p>
      </section>

      {/* Contact Form */}
      <section className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-lg shadow-lg border border-slate-700">
        <form className="space-y-6">
          <div>
            <label className="block text-sm mb-1 text-white">Name</label>
            <input
              type="text"
              placeholder="Your full name"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message here..."
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 border border-white text-white rounded hover:bg-white/10 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </section>

      {/* Optional Info Section */}
      <section className="max-w-3xl mx-auto text-center mt-16 text-slate-400">
        <p>
          Or email us directly at{" "}
          <a href="mailto:support@narratia.com" className="text-blue-400 hover:underline">
            support@narratia.com
          </a>
        </p>
      </section>
    </div>
  );
};

export { Contact };
