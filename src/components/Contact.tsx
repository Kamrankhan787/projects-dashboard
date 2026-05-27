"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Phone, MessageSquare, Link2, Sparkles } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function Contact() {
  const { profile } = usePortfolio();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const cleanWhatsappNumber = profile.whatsapp.replace(/[^0-9+]/g, "");
  const whatsappUrl = cleanWhatsappNumber.startsWith("+") 
    ? `https://api.whatsapp.com/send?phone=${cleanWhatsappNumber.substring(1)}` 
    : `https://api.whatsapp.com/send?phone=${cleanWhatsappNumber}`;

  return (
    <section id="contact" className="py-20 px-6 relative">
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-cyber-purple/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Get In{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-purple to-cyber-cyan">
              Touch
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl">
            Have a project or collaboration in mind? Submit the form below or contact me directly via instant messaging.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Quick Contact Links (2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="p-6 rounded-3xl glass-panel border border-slate-200/50 dark:border-slate-800/50 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles size={16} className="text-cyber-cyan animate-pulse" />
                Direct Communication
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Connect instantly for quick answers, general chat, or coding reviews.
              </p>
            </div>

            {/* Email card */}
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-4 p-5 rounded-2xl glass-card border border-slate-200/40 dark:border-slate-800/50 hover:border-cyber-cyan/40 bg-slate-100/50 dark:bg-slate-950/20 group cursor-pointer"
            >
              <div className="p-3.5 rounded-xl bg-slate-900 text-cyber-cyan group-hover:scale-105 transition-transform duration-300">
                <Mail size={20} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-bold tracking-wider">Email Address</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-300 group-hover:text-cyber-cyan transition-colors">{profile.email}</span>
              </div>
            </a>

            {/* WhatsApp card */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl glass-card border border-slate-200/40 dark:border-slate-800/50 hover:border-emerald-500/40 bg-slate-100/50 dark:bg-slate-950/20 group cursor-pointer"
            >
              <div className="p-3.5 rounded-xl bg-slate-900 text-emerald-450 group-hover:scale-105 transition-transform duration-300">
                <Phone size={20} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-bold tracking-wider">WhatsApp Chat</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-300 group-hover:text-emerald-450 transition-colors">{profile.whatsapp}</span>
              </div>
            </a>

            {/* LinkedIn card */}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl glass-card border border-slate-200/40 dark:border-slate-800/50 hover:border-blue-500/40 bg-slate-100/50 dark:bg-slate-950/20 group cursor-pointer"
            >
              <div className="p-3.5 rounded-xl bg-slate-900 text-blue-400 group-hover:scale-105 transition-transform duration-300">
                <Link2 size={20} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-bold tracking-wider">LinkedIn Messenger</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-300 group-hover:text-blue-450 transition-colors">in/{profile.linkedin.split("/").filter(Boolean).pop()}</span>
              </div>
            </a>

          </div>

          {/* Form Panel (3 Columns) */}
          <div className="lg:col-span-3 p-8 rounded-3xl glass-panel border border-slate-200/50 dark:border-slate-800/50 bg-slate-100/30 dark:bg-slate-950/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-950 border border-slate-250 dark:border-slate-850 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyber-purple dark:focus:border-cyber-cyan transition-colors"
                    placeholder="Enter name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-950 border border-slate-250 dark:border-slate-850 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyber-purple dark:focus:border-cyber-cyan transition-colors"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-950 border border-slate-250 dark:border-slate-850 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyber-purple dark:focus:border-cyber-cyan transition-colors"
                  placeholder="What is this regarding?"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Message Description</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-950 border border-slate-250 dark:border-slate-850 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyber-purple dark:focus:border-cyber-cyan transition-colors resize-none"
                  placeholder="Enter details of your query..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyber-purple to-cyber-blue hover:opacity-90 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-cyber-purple/15 hover:shadow-cyber-purple/25 transition-all duration-350 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                    Sending Message...
                  </span>
                ) : (
                  <>
                    <Send size={16} />
                    Send Transmission
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-450 text-xs text-center"
                >
                  Transmission sent successfully. I will get back to you shortly!
                </motion.div>
              )}

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
