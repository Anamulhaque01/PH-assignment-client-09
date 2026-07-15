"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactView() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [sending, setSending] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSending(true);

    try {
      // Simulate API submit delay (replace with your actual backend contact endpoint if you build one)
      await new Promise((resolve) => setTimeout(resolve, 1200));
      
      toast.success("Message dispatched securely! We'll reply within 24 hours.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Transmission error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-brand-dark py-20 px-6">
      <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Contact Information Cards */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-teal/5 border border-brand-teal/10 px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
              <span className="text-[10px] font-bold tracking-widest text-brand-teal uppercase">
                Support Station
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Get in Touch</h1>
            <p className="text-xs text-brand-muted leading-relaxed">
              Encountered a dashboard sync error or have questions about clinical registration? Send our operations team a secure diagnostic ticket.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            {/* Clinical Office */}
            <div className="p-5 rounded-2xl bg-brand-surface border border-white/5 space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-brand-teal font-semibold">Headquarters</span>
              <p className="text-xs font-bold text-white">Khulna Digital Zone</p>
              <p className="text-[11px] text-brand-muted">NUBTK Campus Core, Bangladesh</p>
            </div>

            {/* Email Support */}
            <div className="p-5 rounded-2xl bg-brand-surface border border-white/5 space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-brand-teal font-semibold">Inquiries</span>
              <p className="text-xs font-bold text-white">support@docappoint.com</p>
              <p className="text-[11px] text-brand-muted">Average ticketing queue: &lt; 2 hours</p>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Minimal Contact Form */}
        <div className="lg:col-span-7 bg-brand-surface border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handleFormSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-brand-muted block mb-1.5 font-semibold">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Khan Anamul"
                  className="w-full bg-brand-dark border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-teal placeholder:text-white/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-brand-muted block mb-1.5 font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@domain.com"
                  className="w-full bg-brand-dark border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-teal placeholder:text-white/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-brand-muted block mb-1.5 font-semibold">
                Subject line
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Diagnostic help, platform feedback..."
                className="w-full bg-brand-dark border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-teal placeholder:text-white/20 transition-all"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-brand-muted block mb-1.5 font-semibold">
                Detailed Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Provide a thorough breakdown of your inquiry..."
                className="w-full bg-brand-dark border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-teal placeholder:text-white/20 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-xl bg-white py-3.5 text-xs font-semibold text-black shadow-lg shadow-brand-teal/5 transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-50 hover:cursor-pointer"
            >
              {sending ? "Transmitting Ticket..." : "Send Message Securely"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}