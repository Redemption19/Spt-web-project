import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Employer Enrollment Form',
  description: 'Register your company pension scheme'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}