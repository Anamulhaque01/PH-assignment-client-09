import React from "react";
import Hero from "@/components/home/Hero";
import DoctorSection from "@/components/home/DoctorSection";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import WorkflowSection from "@/components/home/WorkflowSection";
import FaqSection from "@/components/home/FaqSection";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-brand-dark">
      <Hero />
      <DoctorSection />
      <ServicesSection />
      <StatsSection />
      <WorkflowSection></WorkflowSection>
      <FaqSection></FaqSection>
    </div>
  );
}