"use client"

import * as React from 'react'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { calculateSSNITBenefit, calculateDefinedContributionBenefit, calculateReplacementRatio, formatCurrency } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { InfoCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';
import { PensionCalculatorAI } from '@/components/pension-calculator-ai'

export function PensionCalculator() {
  const [age, setAge] = React.useState(30)
  const [currentSalary, setCurrentSalary] = React.useState(5000)
  const [monthsContributed, setMonthsContributed] = React.useState(0)
  const [salaryGrowthRate, setSalaryGrowthRate] = React.useState(3)
  const [tier2ContributionPercentage, setTier2ContributionPercentage] = React.useState(8)
  const [tier3ContributionPercentage, setTier3ContributionPercentage] = React.useState(5)
  const [investmentGrowthRateTier2, setInvestmentGrowthRateTier2] = React.useState(10)
  const [investmentGrowthRateTier3, setInvestmentGrowthRateTier3] = React.useState(12)
  const [retirementAge, setRetirementAge] = React.useState(60)
  
  const [tier1MonthlyPension, setTier1MonthlyPension] = React.useState(0)
  const [tier2TotalFundValue, setTier2TotalFundValue] = React.useState(0)
  const [tier3TotalFundValue, setTier3TotalFundValue] = React.useState(0)
  const [tier2LumpSum, setTier2LumpSum] = React.useState(0)
  const [tier3LumpSum, setTier3LumpSum] = React.useState(0)
  const [tier2AnnuityIncome, setTier2AnnuityIncome] = React.useState(0)
  const [tier3AnnuityIncome, setTier3AnnuityIncome] = React.useState(0)
  const [replacementRatio, setReplacementRatio] = React.useState(0)
  const [finalProjectedSalary, setFinalProjectedSalary] = React.useState(0)
  const [hasReachedMinMonths, setHasReachedMinMonths] = React.useState(false)
  const [lowReplacementIncomeAlert, setLowReplacementIncomeAlert] = React.useState(false)
  const [retirementReadinessScore, setRetirementReadinessScore] = React.useState('')
  const [chartData, setChartData] = React.useState<any[]>([])

  const [showResults, setShowResults] = React.useState(false)
  
  const calculatePension = () => {
    setHasReachedMinMonths(false);
    setLowReplacementIncomeAlert(false);

    const yearsToRetirement = retirementAge - age;
    let projectedSalaryAtRetirement = currentSalary;
    for (let i = 0; i < yearsToRetirement; i++) {
      projectedSalaryAtRetirement *= (1 + salaryGrowthRate / 100);
    }
    setFinalProjectedSalary(projectedSalaryAtRetirement);

    const ssnitPension = calculateSSNITBenefit(
      age,
      retirementAge,
      projectedSalaryAtRetirement,
      monthsContributed
    );
    setTier1MonthlyPension(ssnitPension);

    if (monthsContributed < 180) {
      setHasReachedMinMonths(true);
    }

    const tier2Benefits = calculateDefinedContributionBenefit(
      age,
      retirementAge,
      currentSalary,
      tier2ContributionPercentage,
      salaryGrowthRate / 100,
      investmentGrowthRateTier2 / 100
    );
    setTier2TotalFundValue(tier2Benefits.totalFundValueAtRetirement);
    setTier2LumpSum(tier2Benefits.projectedLumpSum);
    setTier2AnnuityIncome(tier2Benefits.projectedAnnuityIncome);

    const tier3Benefits = calculateDefinedContributionBenefit(
      age,
      retirementAge,
      currentSalary,
      tier3ContributionPercentage,
      salaryGrowthRate / 100,
      investmentGrowthRateTier3 / 100
    );
    setTier3TotalFundValue(tier3Benefits.totalFundValueAtRetirement);
    setTier3LumpSum(tier3Benefits.projectedLumpSum);
    setTier3AnnuityIncome(tier3Benefits.projectedAnnuityIncome);

    const totalMonthlyRetirementIncome = ssnitPension + tier2AnnuityIncome + tier3AnnuityIncome;
    const ratio = calculateReplacementRatio(totalMonthlyRetirementIncome, projectedSalaryAtRetirement);
    setReplacementRatio(ratio);

    if (ratio < 50) {
      setLowReplacementIncomeAlert(true);
    }

    if (ratio >= 80) {
      setRetirementReadinessScore('Excellent');
    } else if (ratio >= 60) {
      setRetirementReadinessScore('Good');
    } else if (ratio >= 40) {
      setRetirementReadinessScore('Fair');
    } else {
      setRetirementReadinessScore('Needs Improvement');
    }

    const data = [];
    let currentProjectedSalary = currentSalary;
    let currentTier2FundValue = 0;
    let currentTier3FundValue = 0;
    let cumulativeTier2Contributions = 0;
    let cumulativeTier3Contributions = 0;

    for (let year = age; year <= retirementAge; year++) {
      let annualTier2Contribution = 0;
      let annualTier3Contribution = 0;

      if (year > age) {
        currentProjectedSalary *= (1 + salaryGrowthRate / 100);
      }
      
      annualTier2Contribution = currentProjectedSalary * (tier2ContributionPercentage / 100);
      annualTier3Contribution = currentProjectedSalary * (tier3ContributionPercentage / 100);
      
      cumulativeTier2Contributions += annualTier2Contribution;
      cumulativeTier3Contributions += annualTier3Contribution;

      if (year === age) {
        currentTier2FundValue = annualTier2Contribution;
        currentTier3FundValue = annualTier3Contribution;
      } else {
        currentTier2FundValue = (currentTier2FundValue + annualTier2Contribution) * (1 + investmentGrowthRateTier2 / 100);
        currentTier3FundValue = (currentTier3FundValue + annualTier3Contribution) * (1 + investmentGrowthRateTier3 / 100);
      }

      const totalContributions = cumulativeTier2Contributions + cumulativeTier3Contributions;
      const totalInvestmentGains = (currentTier2FundValue + currentTier3FundValue) - totalContributions;
      
      data.push({
        year: year,
        'Projected Salary': Math.round(currentProjectedSalary),
        'Tier 2 Fund': Math.round(currentTier2FundValue),
        'Tier 3 Fund': Math.round(currentTier3FundValue),
        'Total Contributions': Math.round(totalContributions),
        'Investment Gains': Math.round(totalInvestmentGains > 0 ? totalInvestmentGains : 0),
      });
    }
    setChartData(data);

    setShowResults(true);
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto py-12">
      <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>
                Enter your details to calculate your estimated pension.
              </CardDescription>
            </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label htmlFor="age">Current Age: {age}</Label>
                </div>
                <Slider
                  id="age"
                  min={18}
                  max={55}
                  step={1}
                  value={[age]}
                  onValueChange={(value) => setAge(value[0])}
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="salary">Monthly Salary (GHS)</Label>
                <Input
                  id="salary"
                  type="number"
                  min={500}
              value={currentSalary}
              onChange={(e) => setCurrentSalary(Number(e.target.value))}
                  className="input-field"
                />
              </div>
          
          <div className="space-y-3">
            <Label htmlFor="months-contributed">Months Contributed (Tier 1 SSNIT): {monthsContributed}</Label>
            <Slider
              id="months-contributed"
              min={0}
              max={450}
              step={1}
              value={[monthsContributed]}
              onValueChange={(value) => setMonthsContributed(value[0])}
            />
            <p className="text-xs text-muted-foreground">
              Minimum 180 months (15 years) for basic pension. Max 450 months (35 years) for full benefit.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="salary-growth">Expected Annual Salary Growth: {salaryGrowthRate}%</Label>
            </div>
            <Slider
              id="salary-growth"
              min={0}
              max={10}
              step={0.5}
              value={[salaryGrowthRate]}
              onValueChange={(value) => setSalaryGrowthRate(value[0])}
            />
            <p className="text-xs text-muted-foreground">
              Estimates how your salary might increase over time.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="investment-growth-tier2">Expected Annual Tier 2 Investment Growth: {investmentGrowthRateTier2}%</Label>
            </div>
            <Slider
              id="investment-growth-tier2"
              min={5}
              max={15}
              step={0.5}
              value={[investmentGrowthRateTier2]}
              onValueChange={(value) => setInvestmentGrowthRateTier2(value[0])}
            />
            <p className="text-xs text-muted-foreground">
              Average annual return for your Tier 2 pension fund.
            </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
              <Label htmlFor="investment-growth-tier3">Expected Annual Tier 3 Investment Growth: {investmentGrowthRateTier3}%</Label>
                </div>
                <Slider
              id="investment-growth-tier3"
              min={7}
                  max={20}
                  step={0.5}
              value={[investmentGrowthRateTier3]}
              onValueChange={(value) => setInvestmentGrowthRateTier3(value[0])}
            />
            <p className="text-xs text-muted-foreground">
              Average annual return for your voluntary Tier 3 pension fund.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="tier2-contribution">Mandatory Tier 2 Contribution: {tier2ContributionPercentage}%</Label>
            </div>
            <Slider
              id="tier2-contribution"
              min={8}
              max={13.5}
              step={0.5}
              value={[tier2ContributionPercentage]}
              onValueChange={(value) => setTier2ContributionPercentage(value[0])}
                />
                <p className="text-xs text-muted-foreground">
              Mandatory contribution (8% from employer + 5.5% from employee, totaling 13.5% for Tier 1 & 2 combined).
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
              <Label htmlFor="tier3-contribution">Voluntary Tier 3 Contribution: {tier3ContributionPercentage}%</Label>
                </div>
                <Slider
              id="tier3-contribution"
                  min={0}
              max={10}
                  step={1}
              value={[tier3ContributionPercentage]}
              onValueChange={(value) => setTier3ContributionPercentage(value[0])}
                />
                <p className="text-xs text-muted-foreground">
              Additional contributions provide tax benefits and additional retirement income.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label htmlFor="retirement-age">Retirement Age: {retirementAge}</Label>
                </div>
                <Slider
                  id="retirement-age"
                  min={55}
                  max={65}
                  step={1}
                  value={[retirementAge]}
                  onValueChange={(value) => setRetirementAge(value[0])}
                />
              </div>
          <div className="col-span-full pt-4">
              <Button onClick={calculatePension} className="w-full">
                Calculate Estimated Pension
              </Button>
          </div>
        </CardContent>
          </Card>

      {hasReachedMinMonths && (
        <Alert variant="destructive" className="mb-4">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Minimum Contribution Alert!</AlertTitle>
          <AlertDescription>
            You have not reached the minimum 180 months (15 years) of contribution for Tier 1 (SSNIT) pension. 
            Your estimated Tier 1 pension might be very low or zero. Consider increasing your contribution period.
          </AlertDescription>
        </Alert>
      )}

      {lowReplacementIncomeAlert && (
        <Alert variant="warning" className="mb-8">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Low Replacement Income Alert!</AlertTitle>
          <AlertDescription>
            Your projected retirement income ({replacementRatio.toFixed(0)}% of your final salary) 
            is below the recommended replacement ratio (e.g., 70-80%). Consider increasing your contributions 
            or adjusting your retirement plan to ensure a comfortable retirement.
          </AlertDescription>
        </Alert>
      )}
      
          {showResults ? (
        <Card>
              <CardHeader>
                <CardTitle>Your Pension Estimate</CardTitle>
                <CardDescription>
                  Based on your current information and contribution rates
                </CardDescription>
              </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  Estimated Monthly Pension (Tier 1 SSNIT)
                    </h3>
                    <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  {formatCurrency(tier1MonthlyPension)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                  Based on {monthsContributed} months of contribution.
                    </p>
                  </div>
                  
              <div className="text-center">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  Estimated Tier 2 Fund Value at Retirement
                </h3>
                <div className="text-4xl font-bold text-green-500">
                  {formatCurrency(tier2TotalFundValue)}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Projected lump sum from mandatory Tier 2 contributions.
                </p>
                <h3 className="text-lg font-medium text-muted-foreground mb-2 mt-4">
                  Estimated Monthly Annuity Income (Tier 2)
                </h3>
                <div className="text-3xl font-bold text-green-500">
                  {formatCurrency(tier2AnnuityIncome)}
                </div>
              </div>

              {tier3ContributionPercentage > 0 && (
                <div className="text-center">
                      <h3 className="text-lg font-medium text-muted-foreground mb-2">
                    Estimated Tier 3 Fund Value at Retirement
                      </h3>
                  <div className="text-4xl font-bold text-amber-500">
                    {formatCurrency(tier3TotalFundValue)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                    Projected lump sum from voluntary Tier 3 contributions.
                      </p>
                  <h3 className="text-lg font-medium text-muted-foreground mb-2 mt-4">
                    Estimated Monthly Annuity Income (Tier 3)
                  </h3>
                  <div className="text-3xl font-bold text-amber-500">
                    {formatCurrency(tier3AnnuityIncome)}
                  </div>
                    </div>
                  )}
                  
              <div className="text-center">
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  Total Monthly Pension Income
                    </h3>
                    <div className="text-5xl font-bold">
                  {formatCurrency(tier1MonthlyPension + tier2AnnuityIncome + tier3AnnuityIncome)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Estimated at retirement age {retirementAge}
                    </p>
                  </div>

              <div className="text-center">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  Retirement Income Replacement Ratio
                </h3>
                <div className="text-4xl font-bold text-blue-500">
                  {replacementRatio.toFixed(0)}%
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Your estimated retirement income as a percentage of your final projected salary 
                  ({formatCurrency(finalProjectedSalary)}).
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  Retirement Readiness Score
                </h3>
                <div className={`text-5xl font-bold ${retirementReadinessScore === 'Excellent' ? 'text-green-500' : retirementReadinessScore === 'Good' ? 'text-blue-500' : retirementReadinessScore === 'Fair' ? 'text-orange-500' : 'text-red-500'}`}>
                  {retirementReadinessScore}
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4 text-center mt-8">Pension Growth Projection</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartData}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="Projected Salary" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Tier 2 Fund" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Tier 3 Fund" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>

            <h3 className="text-xl font-semibold mb-4 text-center mt-8">Contribution Breakdown Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={chartData}
                margin={{
                  top: 10, right: 30, left: 0, bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Area type="monotone" dataKey="Total Contributions" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="Investment Gains" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>

            <h3 className="text-xl font-semibold mb-4 text-center mt-8">Projected Monthly Income Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[{ name: 'Monthly Income', 'Tier 1': tier1MonthlyPension, 'Tier 2 Annuity': tier2AnnuityIncome, 'Tier 3 Annuity': tier3AnnuityIncome }]}
                margin={{
                  top: 20, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="Tier 1" stackId="a" fill="#8884d8" />
                <Bar dataKey="Tier 2 Annuity" stackId="a" fill="#82ca9d" />
                <Bar dataKey="Tier 3 Annuity" stackId="a" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>

            <h3 className="text-xl font-semibold mb-4 text-center mt-8">Retirement Income Source Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Tier 1 SSNIT', value: tier1MonthlyPension },
                    { name: 'Tier 2 Annuity', value: tier2AnnuityIncome },
                    { name: 'Tier 3 Annuity', value: tier3AnnuityIncome },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  <Cell key="cell-0" fill="#8884d8" />
                  <Cell key="cell-1" fill="#82ca9d" />
                  <Cell key="cell-2" fill="#ffc658" />
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            <h3 className="text-xl font-semibold mb-4 text-center mt-8">Retirement Readiness Gauge</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                barSize={20}
                data={[
                  { name: 'Readiness', value: replacementRatio, fill: replacementRatio >= 80 ? '#22c55e' : replacementRatio >= 60 ? '#3b82f6' : replacementRatio >= 40 ? '#f97316' : '#ef4444' },
                ]}
                startAngle={180}
                endAngle={0}
              >
                <RadialBar dataKey="value" background={{ fill: '#eee' }} />
                <Tooltip formatter={(value: number) => `${value.toFixed(0)}%`} />
                <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" align="right" />
              </RadialBarChart>
            </ResponsiveContainer>

            <p className="text-sm text-muted-foreground text-center mt-8">
              This calculator provides estimates based on current regulations and assumptions. 
              Actual pension values may vary due to investment performance, inflation, regulatory changes, 
              and individual circumstances. Consult a financial advisor for personalized advice.
                </p>
            <Button variant="outline" onClick={() => setShowResults(false)} className="w-full mt-4">
                  Update Calculation
                </Button>
          </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex flex-col justify-center items-center p-8 text-center bg-muted/30">
              <div className="max-w-sm mx-auto">
                <h3 className="text-xl font-medium mb-4">Your Pension Results</h3>
                <p className="text-muted-foreground mb-8">
                  Enter your information and click calculate to see your estimated monthly pension at retirement.
                </p>
                <div className="space-y-2">
                  <div className="h-10 w-full rounded-md bg-muted animate-pulse" />
                  <div className="h-24 w-full rounded-md bg-muted animate-pulse" />
                  <div className="h-10 w-full rounded-md bg-muted animate-pulse" />
                </div>
              </div>
            </Card>
          )}

      {showResults && (
        <>
          <Card className="mb-8">
            
          </Card>

          <PensionCalculatorAI
            age={age}
            currentSalary={currentSalary}
            retirementAge={retirementAge}
            tier2ContributionPercentage={tier2ContributionPercentage}
            tier3ContributionPercentage={tier3ContributionPercentage}
            investmentGrowthRateTier2={investmentGrowthRateTier2}
            investmentGrowthRateTier3={investmentGrowthRateTier3}
            salaryGrowthRate={salaryGrowthRate}
          />
        </>
      )}
    </div>
  )
}