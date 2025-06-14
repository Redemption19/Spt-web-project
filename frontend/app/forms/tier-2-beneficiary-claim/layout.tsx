import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tier 2 Beneficiary Claim Form',
  description: 'Submit your claim for Tier 2 pension benefits as a beneficiary of a deceased member',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}