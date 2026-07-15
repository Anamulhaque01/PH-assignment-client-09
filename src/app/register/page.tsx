import { Metadata } from "next";
import RegisterView from "./RegisterView";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your healthcare account on DocAppoint to safely browse through professional medical specialists.",
  openGraph: {
    title: "Join DocAppoint | Registration",
    description: "Create an account to track your appointments seamlessly.",
  },
};

export default function Page() {
  return <RegisterView />;
}