import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tier 3 Beneficiary Claim Form',
  description: 'Submit your claim for Tier 3 pension benefits as a beneficiary',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4">
      {children}
    </div>
  );
}