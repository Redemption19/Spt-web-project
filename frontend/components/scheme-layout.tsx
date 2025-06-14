"use client"

import { motion } from "framer-motion"
import { Check, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SchemeFeature {
  title: string
}

interface SchemeLayoutProps {
  title: string
  description: string
  features: string[]
  purpose?: string
  className?: string
  children?: React.ReactNode
}

export function SchemeLayout({
  title,
  description,
  features,
  purpose,
  className,
  children
}: SchemeLayoutProps) {
  return (
    <div className="container-custom py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">{title}</h1>
          <p className="text-xl text-muted-foreground">{description}</p>
        </div>

        {purpose && (
          <Card className="mt-8 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
            <CardHeader>
              <CardTitle>Purpose</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">{purpose}</p>
            </CardContent>
          </Card>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Unique Features</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1 bg-primary/10 rounded-full p-1">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-foreground">{feature}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {children}
      </motion.div>
    </div>
  )
}
