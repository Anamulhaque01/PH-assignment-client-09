import LoginView from "./LoginView";

// Next.js reads this metadata block seamlessly on the server side
export const metadata = {
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