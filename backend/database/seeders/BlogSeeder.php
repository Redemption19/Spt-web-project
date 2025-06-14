<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BlogCategory;
use App\Models\BlogAuthor;
use App\Models\BlogTag;
use App\Models\BlogPost;
use Illuminate\Support\Str;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Blog Categories
        $categories = [
            [
                'name' => 'Pension News',
                'description' => 'Latest news and updates about pension schemes and regulations in Ghana'
            ],
            [
                'name' => 'Investment Insights',
                'description' => 'Expert analysis and insights on pension fund investments and market trends'
            ],
            [
                'name' => 'Retirement Planning',
                'description' => 'Guides and tips for effective retirement planning and financial security'
            ],
            [
                'name' => 'Policy Updates',
                'description' => 'Updates on pension policies, regulations, and government initiatives'
            ],
            [
                'name' => 'Member Education',
                'description' => 'Educational content to help pension scheme members understand their benefits'
            ],
            [
                'name' => 'Market Analysis',
                'description' => 'Analysis of financial markets and their impact on pension investments'
            ]
        ];

        foreach ($categories as $category) {
            BlogCategory::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'description' => $category['description']
            ]);
        }

        // Create Blog Authors
        $authors = [
            [
                'name' => 'Dr. Kwame Asante',
                'role' => 'Chief Investment Officer',
                'bio' => 'Dr. Kwame Asante is a seasoned financial expert with over 15 years of experience in pension fund management and investment strategy. He holds a PhD in Economics from the University of Ghana.',
                'linkedin' => 'https://linkedin.com/in/kwame-asante',
                'twitter' => 'https://twitter.com/kwameasante'
            ],
            [
                'name' => 'Akosua Mensah',
                'role' => 'Senior Policy Analyst',
                'bio' => 'Akosua Mensah specializes in pension policy analysis and regulatory compliance. She has been instrumental in shaping pension reforms in Ghana over the past decade.',
                'linkedin' => 'https://linkedin.com/in/akosua-mensah',
                'twitter' => null
            ],
            [
                'name' => 'Emmanuel Osei',
                'role' => 'Retirement Planning Specialist',
                'bio' => 'Emmanuel Osei is a certified financial planner who helps individuals and organizations optimize their retirement planning strategies.',
                'linkedin' => 'https://linkedin.com/in/emmanuel-osei',
                'twitter' => 'https://twitter.com/emmanuelosei'
            ],
            [
                'name' => 'Grace Amponsah',
                'role' => 'Market Research Director',
                'bio' => 'Grace Amponsah leads market research initiatives and provides insights on investment opportunities for pension funds.',
                'linkedin' => 'https://linkedin.com/in/grace-amponsah',
                'twitter' => null
            ]
        ];

        foreach ($authors as $author) {
            BlogAuthor::create($author);
        }

        // Create Blog Tags
        $tags = [
            'Pension Reform', 'Investment Strategy', 'Retirement Planning', 'Financial Security',
            'Market Trends', 'Policy Changes', 'Member Benefits', 'Asset Management',
            'Economic Analysis', 'Regulatory Updates', 'Fund Performance', 'Risk Management',
            'Financial Education', 'Pension Schemes', 'Ghana Economy', 'Investment Returns',
            'Retirement Benefits', 'Social Security', 'Financial Planning', 'Market Volatility'
        ];

        foreach ($tags as $tag) {
            BlogTag::create([
                'name' => $tag,
                'slug' => Str::slug($tag)
            ]);
        }

        // Create Blog Posts
        $posts = [
            [
                'title' => 'Understanding the New Pension Reform Act 2023',
                'excerpt' => 'A comprehensive guide to the latest changes in Ghana\'s pension legislation and what it means for scheme members.',
                'content' => $this->getPensionReformContent(),
                'category' => 'Policy Updates',
                'author' => 'Akosua Mensah',
                'tags' => ['Pension Reform', 'Policy Changes', 'Regulatory Updates'],
                'status' => 'published',
                'meta_title' => 'New Pension Reform Act 2023: Complete Guide',
                'meta_description' => 'Learn about the key changes in Ghana\'s Pension Reform Act 2023 and how it affects your retirement planning.',
                'keywords' => 'pension reform, Ghana pension act, retirement benefits, pension scheme'
            ],
            [
                'title' => 'Investment Strategies for Volatile Markets',
                'excerpt' => 'How pension funds can navigate market uncertainty while maintaining steady returns for members.',
                'content' => $this->getInvestmentStrategyContent(),
                'category' => 'Investment Insights',
                'author' => 'Dr. Kwame Asante',
                'tags' => ['Investment Strategy', 'Market Volatility', 'Risk Management', 'Fund Performance'],
                'status' => 'published',
                'meta_title' => 'Pension Fund Investment Strategies for Volatile Markets',
                'meta_description' => 'Expert insights on investment strategies that help pension funds maintain stability during market volatility.',
                'keywords' => 'investment strategy, pension fund, market volatility, risk management'
            ],
            [
                'title' => 'Maximizing Your Retirement Benefits: A Member\'s Guide',
                'excerpt' => 'Essential tips and strategies to help pension scheme members optimize their retirement benefits.',
                'content' => $this->getRetirementBenefitsContent(),
                'category' => 'Member Education',
                'author' => 'Emmanuel Osei',
                'tags' => ['Retirement Planning', 'Member Benefits', 'Financial Planning', 'Financial Education'],
                'status' => 'published',
                'meta_title' => 'How to Maximize Your Pension Benefits',
                'meta_description' => 'Complete guide to maximizing your pension benefits with expert tips and strategies for retirement planning.',
                'keywords' => 'retirement benefits, pension planning, financial security, retirement savings'
            ],
            [
                'title' => 'Q3 2024 Market Performance Review',
                'excerpt' => 'Analysis of third quarter performance across major asset classes and implications for pension fund investments.',
                'content' => $this->getMarketReviewContent(),
                'category' => 'Market Analysis',
                'author' => 'Grace Amponsah',
                'tags' => ['Market Trends', 'Economic Analysis', 'Fund Performance', 'Asset Management'],
                'status' => 'published',
                'meta_title' => 'Q3 2024 Market Performance Review for Pension Funds',
                'meta_description' => 'Comprehensive analysis of Q3 2024 market performance and its impact on pension fund investments.',
                'keywords' => 'market performance, Q3 2024, pension funds, investment returns'
            ],
            [
                'title' => 'Digital Transformation in Pension Management',
                'excerpt' => 'How technology is revolutionizing pension fund administration and member services.',
                'content' => $this->getDigitalTransformationContent(),
                'category' => 'Pension News',
                'author' => 'Dr. Kwame Asante',
                'tags' => ['Pension Schemes', 'Financial Education', 'Member Benefits'],
                'status' => 'draft',
                'meta_title' => 'Digital Transformation in Pension Management',
                'meta_description' => 'Explore how digital technology is transforming pension fund management and improving member experiences.',
                'keywords' => 'digital transformation, pension technology, fund management, member services'
            ],
            [
                'title' => 'ESG Investing: The Future of Pension Funds',
                'excerpt' => 'Exploring environmental, social, and governance factors in pension fund investment decisions.',
                'content' => $this->getESGContent(),
                'category' => 'Investment Insights',
                'author' => 'Grace Amponsah',
                'tags' => ['Investment Strategy', 'Market Trends', 'Asset Management'],
                'status' => 'draft',
                'meta_title' => 'ESG Investing for Pension Funds',
                'meta_description' => 'Learn how ESG investing is shaping the future of pension fund investment strategies.',
                'keywords' => 'ESG investing, sustainable investing, pension funds, responsible investing'
            ]
        ];

        foreach ($posts as $postData) {
            $category = BlogCategory::where('name', $postData['category'])->first();
            $author = BlogAuthor::where('name', $postData['author'])->first();
            
            $post = BlogPost::create([
                'title' => $postData['title'],
                'slug' => Str::slug($postData['title']),
                'excerpt' => $postData['excerpt'],
                'content' => $postData['content'],
                'category_id' => $category->id,
                'author_id' => $author->id,
                'status' => $postData['status'],
                'published_at' => $postData['status'] === 'published' ? now()->subDays(rand(1, 30)) : null,
                'views' => $postData['status'] === 'published' ? rand(50, 500) : 0,
                'reading_time_minutes' => rand(3, 8),
                'meta_title' => $postData['meta_title'],
                'meta_description' => $postData['meta_description'],
                'keywords' => $postData['keywords']
            ]);

            // Attach tags
            $tagIds = BlogTag::whereIn('name', $postData['tags'])->pluck('id');
            $post->tags()->attach($tagIds);
        }
    }

    private function getPensionReformContent(): string
    {
        return '<h2>Key Changes in the Pension Reform Act 2023</h2>
        
        <p>The Pension Reform Act 2023 introduces significant changes to Ghana\'s pension landscape, aimed at enhancing retirement security for all workers. This comprehensive legislation addresses several key areas that directly impact pension scheme members.</p>
        
        <h3>Enhanced Contribution Rates</h3>
        <p>The new act adjusts contribution rates to ensure better retirement outcomes. Employers and employees will see modified contribution structures that balance affordability with adequate retirement income replacement.</p>
        
        <h3>Improved Vesting Schedules</h3>
        <p>New vesting schedules provide better portability of benefits when members change jobs, ensuring that pension rights are better protected throughout a worker\'s career.</p>
        
        <h3>Strengthened Regulatory Framework</h3>
        <p>The National Pensions Regulatory Authority (NPRA) has been granted enhanced powers to ensure better protection of pension funds and improved oversight of pension trustees.</p>
        
        <h3>Digital Services Integration</h3>
        <p>The act mandates the adoption of digital platforms for pension services, making it easier for members to access their pension information and conduct transactions online.</p>
        
        <h3>What This Means for You</h3>
        <p>As a pension scheme member, these changes will provide you with better protection, improved services, and enhanced retirement security. We recommend reviewing your pension strategy to take full advantage of these improvements.</p>';
    }

    private function getInvestmentStrategyContent(): string
    {
        return '<h2>Navigating Market Volatility</h2>
        
        <p>In today\'s uncertain economic environment, pension funds face the challenge of maintaining steady returns while protecting member assets from market volatility. Our investment strategy focuses on diversification, risk management, and long-term value creation.</p>
        
        <h3>Diversification Across Asset Classes</h3>
        <p>We maintain a balanced portfolio across equities, fixed income, real estate, and alternative investments to reduce concentration risk and smooth out returns over time.</p>
        
        <h3>Active Risk Management</h3>
        <p>Our risk management framework includes:</p>
        <ul>
        <li>Regular stress testing and scenario analysis</li>
        <li>Dynamic asset allocation based on market conditions</li>
        <li>Hedging strategies for currency and interest rate risks</li>
        <li>Continuous monitoring of portfolio performance</li>
        </ul>
        
        <h3>Long-term Focus</h3>
        <p>While short-term market fluctuations can be concerning, our investment approach maintains a long-term perspective that aligns with the retirement goals of our members.</p>
        
        <h3>ESG Integration</h3>
        <p>Environmental, social, and governance factors are increasingly important in investment decisions, offering both risk mitigation and return enhancement opportunities.</p>';
    }

    private function getRetirementBenefitsContent(): string
    {
        return '<h2>Optimizing Your Retirement Benefits</h2>
        
        <p>Planning for retirement requires understanding your pension benefits and making informed decisions throughout your career. Here are key strategies to maximize your retirement income.</p>
        
        <h3>Understand Your Pension Components</h3>
        <p>Ghana\'s pension system consists of three tiers:</p>
        <ul>
        <li><strong>Tier 1:</strong> Basic National Social Security (SSNIT)</li>
        <li><strong>Tier 2:</strong> Occupational Pension Scheme</li>
        <li><strong>Tier 3:</strong> Voluntary Provident Fund</li>
        </ul>
        
        <h3>Maximize Your Contributions</h3>
        <p>Consider making additional voluntary contributions to Tier 3 schemes, which offer tax advantages and higher potential returns.</p>
        
        <h3>Review Your Investment Options</h3>
        <p>Many pension schemes offer different investment options. Younger members may benefit from growth-oriented investments, while those closer to retirement might prefer more conservative options.</p>
        
        <h3>Plan Your Retirement Timing</h3>
        <p>Understanding the impact of early vs. normal retirement on your benefits can help you make the best decision for your financial situation.</p>
        
        <h3>Consider Spousal Benefits</h3>
        <p>Ensure your spouse is aware of survivor benefits and consider joint pension options where available.</p>';
    }

    private function getMarketReviewContent(): string
    {
        return '<h2>Q3 2024 Market Performance Overview</h2>
        
        <p>The third quarter of 2024 presented mixed results across global markets, with significant implications for pension fund performance. Here\'s our comprehensive analysis of key market developments.</p>
        
        <h3>Equity Markets</h3>
        <p>Global equity markets showed resilience despite ongoing economic uncertainties. The Ghana Stock Exchange gained 8.2% during the quarter, outperforming many emerging markets.</p>
        
        <h3>Fixed Income Performance</h3>
        <p>Government bond yields stabilized following central bank policy adjustments. Our fixed income portfolio benefited from duration positioning and credit selection strategies.</p>
        
        <h3>Alternative Investments</h3>
        <p>Real estate and infrastructure investments continued to provide stable returns and inflation protection for our diversified portfolio.</p>
        
        <h3>Currency Impacts</h3>
        <p>The Ghana Cedi showed relative stability against major currencies, reducing foreign exchange risks in our international investments.</p>
        
        <h3>Outlook for Q4</h3>
        <p>We remain cautiously optimistic about the final quarter, maintaining our diversified approach while positioning for potential opportunities in undervalued sectors.</p>';
    }

    private function getDigitalTransformationContent(): string
    {
        return '<h2>The Digital Revolution in Pension Management</h2>
        
        <p>Technology is transforming how pension funds operate and serve their members. From automated processes to enhanced member experiences, digital transformation is reshaping the industry.</p>
        
        <h3>Member Self-Service Platforms</h3>
        <p>Modern pension schemes now offer comprehensive online portals where members can:</p>
        <ul>
        <li>Check account balances and transaction history</li>
        <li>Update personal information</li>
        <li>Request benefit estimates</li>
        <li>Submit claims and documents</li>
        </ul>
        
        <h3>Mobile Applications</h3>
        <p>Dedicated mobile apps provide convenient access to pension information and services, enabling members to stay connected with their retirement savings on the go.</p>
        
        <h3>Automated Investment Management</h3>
        <p>Artificial intelligence and machine learning are being used to optimize investment strategies and risk management processes.</p>
        
        <h3>Enhanced Security</h3>
        <p>Advanced cybersecurity measures protect member data and fund assets in the digital environment.</p>';
    }

    private function getESGContent(): string
    {
        return '<h2>ESG Investing: A Sustainable Approach to Pension Management</h2>
        
        <p>Environmental, Social, and Governance (ESG) factors are becoming increasingly important in investment decisions. For pension funds, ESG investing offers the potential for sustainable long-term returns while supporting positive social and environmental outcomes.</p>
        
        <h3>Environmental Considerations</h3>
        <p>Climate change and environmental sustainability are key factors in our investment analysis. We seek opportunities in renewable energy, clean technology, and companies with strong environmental management practices.</p>
        
        <h3>Social Impact</h3>
        <p>We evaluate companies based on their treatment of employees, community engagement, and contribution to social development.</p>
        
        <h3>Governance Standards</h3>
        <p>Strong corporate governance is essential for sustainable business performance. We prioritize investments in companies with transparent management structures and ethical business practices.</p>
        
        <h3>Performance Benefits</h3>
        <p>Research shows that companies with strong ESG practices often outperform their peers over the long term, making ESG investing aligned with our fiduciary responsibility to maximize member returns.</p>';
    }
}
