import { Metadata } from "next";
import AllAppointmentsView from "./AllAppointmentsView";

export const metadata: Metadata = {
  title: "Available Doctor Appointments",
  description: "Browse through our collection of certified healthcare specialists, check consulting session fees, ratings, and book your next checkup appointment.",
  openGraph: {
    title: "Find Certified Clinicians | DocAppoint",
    description: "Search and filter our global medical directory to locate top-rated specialists instantly.",
  },
};

export default function Page() {
  return <AllAppointmentsView />;
}