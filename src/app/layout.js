import Navbar from "@/components/shared/Navbar";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Footer from "@/components/shared/Footer";

export const metadata = {
  title: {
    default: "DocAppoint | Manage Your Medical Appointments Seamlessly",
    template: "%s | DocAppoint"
  },
  description: "Seamlessly connect with top-rated medical experts and take full control of your healthcare journey.",
  keywords: ["Doctor Appointment", "Healthcare", "DocAppoint", "Medical Booking", "Find Doctors"],
  authors: [{ name: "DocAppoint Team" }],
  openGraph: {
    title: "DocAppoint - Doctor Appointment Manager",
    description: "Connect with top medical experts effortlessly.",
    url: "https://ph-assignment-client-09.vercel.app/", // Replace with your production live link 
    siteName: "DocAppoint",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-brand-dark text-white antialiased selection:bg-brand-teal/20 selection:text-brand-teal">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#121824', // Matches your brand-surface / dark theme
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              fontSize: '14px',
            },
          }}
        />
        <Navbar />
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}