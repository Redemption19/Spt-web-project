import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Pension Claim Form",
  description: "Submit your claim for personal pension benefits",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}