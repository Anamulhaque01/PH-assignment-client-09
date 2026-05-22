import Navbar from "@/components/shared/Navbar";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Footer from "@/components/shared/Footer";

export const metadata = {
  title: "DocAppoint — Book Trusted Doctors Online",
  description: "Premium healthcare dashboard and doctor appointment system.",
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