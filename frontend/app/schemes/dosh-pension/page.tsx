"use client"

import { SchemeLayout } from "@/components/scheme-layout"

export default function DoshPensionPage() {
  return (
    <SchemeLayout
      title="DOSH Personal Pensions Scheme (The Combo)"
      description="A specialized personal pension scheme combining the benefits of traditional pension savings with modern financial flexibility."
      features={[
        "Guaranteed lump sum payment",
        "Flexible contribution options",
        "Tax reliefs for contributions up to 35% of gross salary",
        "Enhanced withdrawal options in line with Scheme rules",
        "Access to competitive loan rates",
      ]}
    />
  )
}
