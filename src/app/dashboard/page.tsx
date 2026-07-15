import { Metadata } from "next";
import DashboardView from "./DashboardView";

export const metadata: Metadata = {
  title: "Dashboard Workspace",
  description: "Monitor your booked clinical appointments, modify upcoming patient visits, and track your healthcare history updates live.",
  openGraph: {
    title: "Your Dashboard Workspace | DocAppoint",
    description: "Overview of your scheduled medical appointments.",
  },
};

export default function Page() {
  return <DashboardView />;
}