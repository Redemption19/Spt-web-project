"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const schemes = [
  {
    title: "Best Pensions Master Trust Scheme",
    description: "A mandatory Tier 2 scheme providing 5% contribution of basic salary for retirement security.",
    href: "/schemes/master-trust",
    gradient: "from-primary/20 via-transparent to-accent/20",
  },
  {
    title: "Best Personal Pensions Scheme",
    description: "A flexible Tier 3 long-term investment scheme with tax benefits for enhanced pension.",
    href: "/schemes/personal-pension",
    gradient: "from-accent/20 via-transparent to-primary/20",
  },
  {
    title: "DOSH Personal Pensions Scheme",
    description: "The Combo - A specialized personal pension scheme combining traditional benefits with modern flexibility.",
    href: "/schemes/dosh-pension",
    gradient: "from-primary/20 via-accent/20 to-transparent",
  },
  {
    title: "Best Provident Fund Scheme",
    description: "A fully funded and privately managed Tier 3 provident fund scheme with tax benefits.",
    href: "/schemes/provident-fund",
    gradient: "from-accent/20 via-primary/20 to-transparent",
  },
  {
    title: "Employer Sponsored Schemes",
    description: "Comprehensive trustee services for 2nd & 3rd Tier pensions with full establishment ownership.",
    href: "/schemes/employer-sponsored",
    gradient: "from-primary/20 to-accent/20",
  },
]

export default function SchemesPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Our Pension Schemes</h1>
        <p className="text-xl text-muted-foreground">
          Choose from our range of comprehensive pension schemes designed to secure your financial future
          and provide peace of mind during retirement.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {schemes.map((scheme, index) => (
          <motion.div
            key={scheme.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={scheme.href} className="block h-full">              <Card className={`h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br ${scheme.gradient}`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between group">
                    {scheme.title}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </CardTitle>
                  <CardDescription className="text-base">
                    {scheme.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
