import { Metadata } from 'next'
import { PensionCalculator } from '@/components/pension-calculator'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { BarChart, LineChart } from 'lucide-react'
import { InfoCircledIcon } from '@radix-ui/react-icons'

export const metadata: Metadata = {
  title: 'Pension Calculator',
  description: 'Calculate your estimated pension benefits at retirement based on your current salary, age, and contribution levels.',
}

export default function PensionCalculatorPage() {
  return (
    <div className="container-custom py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Pension Calculator</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Use our interactive pension calculator to estimate your monthly retirement income based on your current situation.
        </p>
      </div>
      
      <PensionCalculator />
      
      <div className="mt-16 max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold mb-4">Understanding Your Pension Calculation</CardTitle>
            <CardDescription className="text-center text-lg leading-relaxed">
              This calculator provides an estimate of your monthly pension at retirement based on your current age, salary, 
              contribution percentage, and expected retirement age. The calculation includes:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 p-6">
            {/* Mandatory Contributions */}
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 bg-muted/30 p-6 rounded-lg border border-border/40">
              <div className="shrink-0">
                <BarChart className="h-16 w-16 text-primary" /> {/* Placeholder Icon */}
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2 text-foreground">Mandatory Contributions (Tier 1 & 2)</h3>
                <p className="text-muted-foreground leading-relaxed">
              The minimum mandatory contribution is 13.5% of your salary (5.5% from you and 8% from your employer).
              These contributions go to your basic pension fund and are invested until retirement.
            </p>
              </div>
          </div>
          
            {/* Voluntary Contributions */}
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 bg-muted/30 p-6 rounded-lg border border-border/40">
              <div className="shrink-0">
                <LineChart className="h-16 w-16 text-accent" /> {/* Placeholder Icon */}
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2 text-foreground">Voluntary Contributions (Tier 3)</h3>
                <p className="text-muted-foreground leading-relaxed">
              Any additional voluntary contributions you make provide tax benefits and significantly enhance your 
              retirement income. These contributions are also eligible for tax relief.
            </p>
              </div>
          </div>
          
            {/* Important Notes */}
            <div className="bg-amber-100/20 text-amber-800 dark:bg-neutral-800 p-6 rounded-lg border border-amber-300 dark:border-yellow-300">
              <div className="flex items-center space-x-3 mb-4">
                <InfoCircledIcon className="h-6 w-6 shrink-0 text-amber-600 dark:text-yellow-300" />
                <h3 className="text-xl font-semibold text-amber-800 dark:text-yellow-200">Important Notes</h3>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-amber-700 dark:text-yellow-100">
              <li>This calculator uses simplified assumptions and is meant for illustrative purposes only.</li>
              <li>Actual pension values will depend on investment performance, inflation rates, and regulatory changes.</li>
              <li>The calculation assumes consistent contributions throughout your working years.</li>
              <li>We recommend reviewing your pension plan regularly with a financial advisor.</li>
                <li>References: SSNIT Act, 2008 (Act 766) and National Pensions Regulatory Authority (NPRA) guidelines.</li>
            </ul>
          </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}