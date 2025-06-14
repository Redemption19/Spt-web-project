<?php

namespace Database\Seeders;

use App\Models\Download;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DownloadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        try {
            $downloads = [
                [
                    'title' => 'Pension Scheme Application Form',
                    'description' => 'Complete this form to apply for individual or corporate pension schemes. Includes all necessary fields and guidance notes.',
                    'file_path' => 'downloads/pension-application-form.pdf',
                    'category' => 'forms',
                    'file_size' => 245,
                    'download_count' => 1256,
                    'active' => true,
                ],
                [
                    'title' => 'Investment Portfolio Guide 2025',
                    'description' => 'Comprehensive guide to our investment options, risk profiles, and historical performance data for informed decision making.',
                    'file_path' => 'downloads/investment-portfolio-guide-2025.pdf',
                    'category' => 'guides',
                    'file_size' => 1840,
                    'download_count' => 892,
                    'active' => true,
                ],
                [
                    'title' => 'Annual Report 2024',
                    'description' => 'Our complete annual report showcasing financial performance, member growth, and strategic achievements for 2024.',
                    'file_path' => 'downloads/annual-report-2024.pdf',
                    'category' => 'reports',
                    'file_size' => 3250,
                    'download_count' => 567,
                    'active' => true,
                ],
                [
                    'title' => 'Pension Benefits Brochure',
                    'description' => 'Detailed overview of all pension benefits, including retirement, disability, and survivor benefits with calculation examples.',
                    'file_path' => 'downloads/pension-benefits-brochure.pdf',
                    'category' => 'brochures',
                    'file_size' => 780,
                    'download_count' => 2134,
                    'active' => true,
                ],
                [
                    'title' => 'Member Contribution Statement Template',
                    'description' => 'Excel template for tracking your pension contributions. Includes formulas for calculating projected retirement benefits.',
                    'file_path' => 'downloads/contribution-statement-template.xlsx',
                    'category' => 'forms',
                    'file_size' => 125,
                    'download_count' => 1789,
                    'active' => true,
                ],
                [
                    'title' => 'Retirement Planning Checklist',
                    'description' => 'Step-by-step checklist to help you plan for retirement, covering financial, legal, and lifestyle considerations.',
                    'file_path' => 'downloads/retirement-planning-checklist.pdf',
                    'category' => 'guides',
                    'file_size' => 156,
                    'download_count' => 3421,
                    'active' => true,
                ],
                [
                    'title' => 'Investment Policy Statement',
                    'description' => 'Official document outlining our investment philosophy, asset allocation strategy, and risk management framework.',
                    'file_path' => 'downloads/investment-policy-statement.pdf',
                    'category' => 'policies',
                    'file_size' => 445,
                    'download_count' => 234,
                    'active' => true,
                ],
                [
                    'title' => 'Pension Scheme Rules & Regulations',
                    'description' => 'Complete terms and conditions governing our pension schemes, including eligibility criteria and benefit calculations.',
                    'file_path' => 'downloads/scheme-rules-regulations.pdf',
                    'category' => 'policies',
                    'file_size' => 890,
                    'download_count' => 1456,
                    'active' => true,
                ],
                [
                    'title' => 'Quarterly Newsletter Q4 2024',
                    'description' => 'Latest quarterly newsletter featuring market updates, scheme performance, and member spotlights.',
                    'file_path' => 'downloads/newsletter-q4-2024.pdf',
                    'category' => 'newsletters',
                    'file_size' => 2340,
                    'download_count' => 756,
                    'active' => true,
                ],
                [
                    'title' => 'ESG Investment Presentation',
                    'description' => 'Presentation on our Environmental, Social, and Governance investment approach and sustainable investing principles.',
                    'file_path' => 'downloads/esg-investment-presentation.pptx',
                    'category' => 'presentations',
                    'file_size' => 5670,
                    'download_count' => 189,
                    'active' => true,
                ],
                [
                    'title' => 'Fund Performance Report Q4 2024',
                    'description' => 'Detailed performance analysis of all investment funds, including benchmarking and risk-adjusted returns.',
                    'file_path' => 'downloads/fund-performance-q4-2024.pdf',
                    'category' => 'reports',
                    'file_size' => 1250,
                    'download_count' => 645,
                    'active' => true,
                ],
                [
                    'title' => 'Pension Calculator Spreadsheet',
                    'description' => 'Advanced Excel calculator to project your retirement income based on various contribution scenarios and investment returns.',
                    'file_path' => 'downloads/pension-calculator-spreadsheet.xlsx',
                    'category' => 'other',
                    'file_size' => 287,
                    'download_count' => 2789,
                    'active' => true,
                ],
                [
                    'title' => 'Member Portal User Guide',
                    'description' => 'Step-by-step guide to using our online member portal, including how to view statements and update personal information.',
                    'file_path' => 'downloads/member-portal-user-guide.pdf',
                    'category' => 'guides',
                    'file_size' => 567,
                    'download_count' => 1923,
                    'active' => true,
                ],
                [
                    'title' => 'Tax Benefits of Pension Contributions',
                    'description' => 'Comprehensive guide explaining the tax advantages of pension contributions under Ghana\'s tax laws.',
                    'file_path' => 'downloads/tax-benefits-guide.pdf',
                    'category' => 'guides',
                    'file_size' => 334,
                    'download_count' => 1567,
                    'active' => true,
                ],
                [
                    'title' => 'Employer Setup Guide',
                    'description' => 'Guide for employers looking to set up corporate pension schemes for their employees, including setup procedures and requirements.',
                    'file_path' => 'downloads/employer-setup-guide.pdf',
                    'category' => 'guides',
                    'file_size' => 678,
                    'download_count' => 423,
                    'active' => true,
                ],
                [
                    'title' => 'Member Transfer Form',
                    'description' => 'Form for members who wish to transfer their pension benefits from another pension scheme to ours.',
                    'file_path' => 'downloads/member-transfer-form.pdf',
                    'category' => 'forms',
                    'file_size' => 198,
                    'download_count' => 345,
                    'active' => true,
                ],
                [
                    'title' => 'Financial Education Brochure',
                    'description' => 'Educational material covering basic financial planning concepts, budgeting, and the importance of early retirement planning.',
                    'file_path' => 'downloads/financial-education-brochure.pdf',
                    'category' => 'brochures',
                    'file_size' => 456,
                    'download_count' => 2456,
                    'active' => true,
                ],
                [
                    'title' => 'Beneficiary Nomination Form',
                    'description' => 'Important form to nominate beneficiaries for your pension benefits in case of death before retirement.',
                    'file_path' => 'downloads/beneficiary-nomination-form.pdf',
                    'category' => 'forms',
                    'file_size' => 89,
                    'download_count' => 1789,
                    'active' => true,
                ],
            ];

            foreach ($downloads as $download) {
                Download::create($download);
            }

            $this->command->info('Downloads seeded successfully! Total: ' . count($downloads));
        } catch (\Exception $e) {
            $this->command->error('Error seeding downloads: ' . $e->getMessage());
            throw $e;
        }
    }
}
