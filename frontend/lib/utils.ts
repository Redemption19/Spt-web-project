import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to locale string
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Format time to 12-hour format
export function formatTime(time: string): string {
  return time;
}

// Calculate SSNIT (Tier 1) pension benefit
export function calculateSSNITBenefit(
  currentAge: number,
  retirementAge: number,
  averageBest36MonthsSalary: number,
  totalContributionMonths: number
): number {
  const maxMonths = 450; // Max months for 60% (35 years)
  const minMonthsForPension = 180; // 15 years
  const basePercentage = 0.375; // 37.5% for 180 months
  const additionalPercentagePerMonth = 0.0009375; // 0.09375% per extra month

  let pensionableMonths = Math.min(totalContributionMonths, maxMonths);

  let pensionPercentage: number;
  if (pensionableMonths < minMonthsForPension) {
    return 0; // Not eligible for pension yet or very low benefit
  } else {
    pensionPercentage = basePercentage + (pensionableMonths - minMonthsForPension) * additionalPercentagePerMonth;
    pensionPercentage = Math.min(pensionPercentage, 0.60); // Cap at 60%
  }

  // Early retirement reduction logic
  let adjustedRetirementAge = retirementAge;
  if (retirementAge < 60) {
    const yearsEarly = 60 - retirementAge;
    // Simple reduction: 5% per year early (example, actual SSNIT may vary)
    const reductionFactor = Math.pow(0.95, yearsEarly); // 0.95 for 5% reduction per year
    pensionPercentage *= reductionFactor;
  }

  return averageBest36MonthsSalary * pensionPercentage;
}

// Calculate Defined Contribution (Tier 2 & 3) fund value and benefits
export function calculateDefinedContributionBenefit(
  currentAge: number,
  retirementAge: number,
  currentSalary: number,
  annualContributionPercentage: number,
  salaryGrowthRate: number, // e.g., 0.05 for 5%
  investmentGrowthRate: number // e.g., 0.08 for 8%
): {
  totalFundValueAtRetirement: number;
  projectedLumpSum: number;
  projectedAnnuityIncome: number;
  projectedScheduledWithdrawals: number;
} {
  let totalFundValue = 0;
  let currentSalaryProjection = currentSalary;

  for (let year = currentAge; year < retirementAge; year++) {
    // Simulate salary growth
    currentSalaryProjection *= (1 + salaryGrowthRate);
    const annualContribution = currentSalaryProjection * (annualContributionPercentage / 100);

    // Add contribution and apply investment growth
    totalFundValue = (totalFundValue + annualContribution) * (1 + investmentGrowthRate);
  }

  // For simplicity, lump sum is the total fund value
  const projectedLumpSum = totalFundValue;

  // Simplified annuity projection: distribute over 20 years (240 months)
  const annuityPayoutPeriodMonths = 240;
  const projectedAnnuityIncome = totalFundValue / annuityPayoutPeriodMonths;

  // For scheduled withdrawals, we can initially use the same as annuity for simplicity
  const projectedScheduledWithdrawals = projectedAnnuityIncome; 
  
  return {
    totalFundValueAtRetirement: totalFundValue,
    projectedLumpSum,
    projectedAnnuityIncome,
    projectedScheduledWithdrawals,
  };
}

// Calculate Replacement Ratio
export function calculateReplacementRatio(
  totalRetirementIncome: number,
  finalSalary: number
): number {
  if (finalSalary === 0) return 0;
  return (totalRetirementIncome / finalSalary) * 100;
}

// Format currency to Ghana Cedis
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}