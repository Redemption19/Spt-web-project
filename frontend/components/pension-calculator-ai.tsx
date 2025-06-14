import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { InfoCircledIcon } from '@radix-ui/react-icons'

interface PensionCalculatorAIProps {
  age: number
  currentSalary: number
  retirementAge: number
  tier2ContributionPercentage: number
  tier3ContributionPercentage: number
  investmentGrowthRateTier2: number
  investmentGrowthRateTier3: number
  salaryGrowthRate: number
}

export function PensionCalculatorAI({
  age,
  currentSalary,
  retirementAge,
  tier2ContributionPercentage,
  tier3ContributionPercentage,
  investmentGrowthRateTier2,
  investmentGrowthRateTier3,
  salaryGrowthRate,
}: PensionCalculatorAIProps) {
  const [activeTab, setActiveTab] = React.useState('scenarios')
  const [scenarios, setScenarios] = React.useState<any[]>([])
  const [recommendations, setRecommendations] = React.useState<any[]>([])
  const [investmentStrategy, setInvestmentStrategy] = React.useState<any>(null)

  // Generate AI-powered scenarios
  const generateScenarios = React.useCallback(() => {
    const baseScenario = {
      name: 'Current Plan',
      retirementAge,
      tier2Contribution: tier2ContributionPercentage,
      tier3Contribution: tier3ContributionPercentage,
      projectedIncome: currentSalary * (1 + salaryGrowthRate / 100) ** (retirementAge - age),
    }

    const scenarios = [
      baseScenario,
      {
        name: 'Early Retirement',
        retirementAge: Math.min(retirementAge - 5, 55),
        tier2Contribution: tier2ContributionPercentage + 2,
        tier3Contribution: tier3ContributionPercentage + 3,
        projectedIncome: currentSalary * (1 + (salaryGrowthRate + 1) / 100) ** (retirementAge - age - 5),
      },
      {
        name: 'Career Break',
        retirementAge: retirementAge + 2,
        tier2Contribution: tier2ContributionPercentage,
        tier3Contribution: tier3ContributionPercentage + 5,
        projectedIncome: currentSalary * (1 + (salaryGrowthRate - 1) / 100) ** (retirementAge - age + 2),
      },
      {
        name: 'Aggressive Savings',
        retirementAge,
        tier2Contribution: tier2ContributionPercentage + 3,
        tier3Contribution: tier3ContributionPercentage + 7,
        projectedIncome: currentSalary * (1 + (salaryGrowthRate + 2) / 100) ** (retirementAge - age),
      },
    ]

    setScenarios(scenarios)
  }, [age, currentSalary, retirementAge, tier2ContributionPercentage, tier3ContributionPercentage, salaryGrowthRate])

  // Generate AI-powered recommendations
  const generateRecommendations = React.useCallback(() => {
    const recommendations = [
      {
        type: 'Contribution',
        title: 'Increase Voluntary Contributions',
        description: 'Based on your current salary and retirement goals, consider increasing your Tier 3 contributions by 2-3% to improve your retirement income.',
        impact: 'High',
        priority: 1,
      },
      {
        type: 'Investment',
        title: 'Diversify Investment Strategy',
        description: 'Your current investment mix could be optimized for better risk-adjusted returns. Consider rebalancing your portfolio to include more growth-oriented assets.',
        impact: 'Medium',
        priority: 2,
      },
      {
        type: 'Timing',
        title: 'Review Retirement Age',
        description: 'Your current retirement age may not provide sufficient time to reach your desired retirement income. Consider extending your working years by 2-3 years.',
        impact: 'High',
        priority: 1,
      },
    ]

    setRecommendations(recommendations)
  }, [])

  // Generate AI-powered investment strategy
  const generateInvestmentStrategy = React.useCallback(() => {
    const strategy = {
      currentAllocation: {
        conservative: 40,
        moderate: 40,
        aggressive: 20,
      },
      recommendedAllocation: {
        conservative: 30,
        moderate: 45,
        aggressive: 25,
      },
      reasoning: 'Based on your age, risk tolerance, and retirement goals, a slightly more aggressive allocation could help achieve better long-term returns while maintaining reasonable risk levels.',
      expectedReturn: {
        current: 8.5,
        recommended: 9.2,
      },
    }

    setInvestmentStrategy(strategy)
  }, [])

  React.useEffect(() => {
    generateScenarios()
    generateRecommendations()
    generateInvestmentStrategy()
  }, [generateScenarios, generateRecommendations, generateInvestmentStrategy])

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>AI-Powered Retirement Insights</CardTitle>
        <CardDescription>
          Explore personalized scenarios, recommendations, and investment strategies powered by AI analysis.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scenarios">Scenario Planning</TabsTrigger>
            <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
            <TabsTrigger value="investment">Investment Strategy</TabsTrigger>
          </TabsList>

          <TabsContent value="scenarios" className="space-y-4">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scenarios}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="projectedIncome" stroke="#8884d8" name="Projected Income" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scenarios.map((scenario) => (
                <Card key={scenario.name}>
                  <CardHeader>
                    <CardTitle className="text-lg">{scenario.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>Retirement Age: {scenario.retirementAge}</p>
                      <p>Tier 2 Contribution: {scenario.tier2Contribution}%</p>
                      <p>Tier 3 Contribution: {scenario.tier3Contribution}%</p>
                      <p>Projected Income: GHS {Math.round(scenario.projectedIncome).toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            {recommendations.map((recommendation) => (
              <Alert key={recommendation.title}>
                <InfoCircledIcon className="h-4 w-4" />
                <AlertDescription className="space-y-2">
                  <div className="font-semibold">{recommendation.title}</div>
                  <p>{recommendation.description}</p>
                  <div className="flex gap-4 text-sm">
                    <span>Impact: {recommendation.impact}</span>
                    <span>Priority: {recommendation.priority}</span>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </TabsContent>

          <TabsContent value="investment" className="space-y-4">
            {investmentStrategy && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Allocation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p>Conservative: {investmentStrategy.currentAllocation.conservative}%</p>
                        <p>Moderate: {investmentStrategy.currentAllocation.moderate}%</p>
                        <p>Aggressive: {investmentStrategy.currentAllocation.aggressive}%</p>
                        <p>Expected Return: {investmentStrategy.expectedReturn.current}%</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Recommended Allocation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p>Conservative: {investmentStrategy.recommendedAllocation.conservative}%</p>
                        <p>Moderate: {investmentStrategy.recommendedAllocation.moderate}%</p>
                        <p>Aggressive: {investmentStrategy.recommendedAllocation.aggressive}%</p>
                        <p>Expected Return: {investmentStrategy.expectedReturn.recommended}%</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Alert>
                  <InfoCircledIcon className="h-4 w-4" />
                  <AlertDescription>{investmentStrategy.reasoning}</AlertDescription>
                </Alert>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 