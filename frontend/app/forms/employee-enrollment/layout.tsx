import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Employee Enrollment Form',
  description: 'Online form for enrolling in the pension scheme',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}