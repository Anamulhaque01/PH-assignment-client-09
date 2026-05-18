import Navbar from "@/components/shared/Navbar";
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
        <Navbar />
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}