import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tier 2 Benefit Claim Form',
  description: 'Submit your claim for Tier 2 pension benefits',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}