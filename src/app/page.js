import React from "react";
import Hero from "@/components/home/Hero";
import DoctorSection from "@/components/home/DoctorSection";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-brand-dark">
      <Hero></Hero>
      <DoctorSection></DoctorSection>
    </div>
  );
}