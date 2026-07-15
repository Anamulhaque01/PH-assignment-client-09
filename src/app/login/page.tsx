import { Metadata } from "next";
import LoginView from "./LoginView";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your DocAppoint account to securely schedule patient visits and check your personal healthcare dashboard charts.",
  openGraph: {
    title: "Sign In | DocAppoint",
    description: "Access your medical dashboard securely.",
  },
};

export default function Page() {
  return <LoginView />;
}