// Navigation Items
export const navItems = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'About Us',
    href: '/about',
    dropdown: [
      { title: 'Company Overview', href: '/about' },
      { title: 'Leadership', href: '/about/leadership' },
      { title: 'Timeline', href: '/about/timeline' },
      { title: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Services',
    href: '/services',
    dropdown: [
      { title: 'Self-Service Centre', href: '/services/self-service-center' },
      { title: 'Enrollments', href: '/services/enrollment' },
      { title: 'Survey Feedback', href: '/services/survey-feedback' },
      { title: 'FAQs', href: '/services/faq' },
    ],
  },
  {
    title: 'Schemes',
    href: '/schemes',
    dropdown: [
      { title: 'Best Pensions Master Trust Scheme', href: '/schemes/master-trust' },
      { title: 'Best Personal Pensions Scheme', href: '/schemes/personal-pension' },
      { title: 'Best Provident Fund Scheme', href: '/schemes/provident-fund' },
      { title: 'Employer Sponsored Schemes', href: '/schemes/employer-sponsored' },
    ],
  },
  {
    title: 'Media',
    href: '/media',
    dropdown: [
      { title: 'Blog', href: '/media/blog' },
      { title: 'Events', href: '/media/events' },
      { title: 'Downloads', href: '/media/downloads' },
      { title: 'Gallery', href: '/media/gallery' },
    ],
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];

// Footer Links
export const footerLinks = {
  services: [
    { title: 'Self-Service Centre', href: '/services/self-service' },
    { title: 'Enrollments', href: '/services/enrollments' },
    { title: 'Survey Feedback', href: '/services/survey-feedback' },
    { title: 'FAQs', href: '/services/faqs' },
  ],
  schemes: [
    { title: 'Master Trust', href: '/schemes/master-trust' },
    { title: 'Personal Pension', href: '/schemes/personal-pension' },
    { title: 'Provident Fund', href: '/schemes/provident-fund' },
    { title: 'Employer Sponsored', href: '/schemes/employer-sponsored' },
  ],
  media: [
    { title: 'Blog', href: '/media/blog' },
    { title: 'Events', href: '/media/events' },
    { title: 'Downloads', href: '/media/downloads' },
    { title: 'Gallery', href: '/media/gallery' },
  ],
  legal: [
    { title: 'Privacy Policy', href: '/legal/privacy-policy' },
    { title: 'Terms & Conditions', href: '/legal/terms' },
    { title: 'Fee Breakdown', href: '/legal/fees' },
  ],
};

// Pension Schemes
export const pensionSchemes = [
  {
    id: 'master-trust',
    title: 'Master Trust',
    description: 'A multi-employer pension scheme designed for organizations looking for a comprehensive retirement solution.',
    benefits: [
      'Reduced administrative burden',
      'Lower costs through economies of scale',
      'Expert investment management',
      'Full regulatory compliance',
    ],
    icon: 'Building',
  },
  {
    id: 'personal-pension',
    title: 'Personal Pension',
    description: 'Individual pension plans for self-employed professionals and those seeking additional retirement security.',
    benefits: [
      'Complete control over contributions',
      'Tax advantages on savings',
      'Flexible investment options',
      'Portable between employers',
    ],
    icon: 'User',
  },
  {
    id: 'provident-fund',
    title: 'Provident Fund',
    description: 'A savings scheme where both employers and employees contribute to build a retirement fund.',
    benefits: [
      'Matched employer contributions',
      'Lump-sum payment at retirement',
      'Tax-efficient savings',
      'Emergency access provisions',
    ],
    icon: 'Landmark',
  },
  {
    id: 'employer-sponsored',
    title: 'Employer Sponsored',
    description: 'Customized pension schemes designed specifically for your organization\'s unique needs.',
    benefits: [
      'Tailored to company requirements',
      'Enhanced employee retention',
      'Corporate governance oversight',
      'Integrated HR benefits solution',
    ],
    icon: 'Briefcase',
  },
];

// Stats
export const companyStats = [
  { value: '17,710+', label: 'Members' },
  { value: '8', label: 'Branches' },
  { value: '15+', label: 'Years Experience' },
  { value: '99.8%', label: 'Client Satisfaction' },
];

// Team
export const leadershipTeam = [
  {
    name: 'Kofi Mensah',
    position: 'CEO',
    bio: 'With over 20 years in financial services, Kofi leads Standard Pensions Trust with a vision for inclusive retirement planning across Ghana.',
    image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Abena Osei',
    position: 'CFO',
    bio: 'Abena brings extensive expertise in financial management and strategic planning to ensure the security and growth of all member funds.',
    image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Emmanuel Darko',
    position: 'CTO',
    bio: 'Emmanuel leads our digital transformation efforts, ensuring our technological infrastructure supports members with reliable, secure services.',
    image: 'https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Akosua Boateng',
    position: 'Head of Client Services',
    bio: 'Akosua ensures our members receive exceptional support and guidance through every stage of their retirement planning journey.',
    image: 'https://images.pexels.com/photos/4429279/pexels-photo-4429279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

// Timeline Events
export const timelineEvents = [
  {
    year: '2008',
    title: 'Foundation',
    description: 'Standard Pensions Trust was established with a mission to transform retirement planning in Ghana.',
  },
  {
    year: '2010',
    title: 'First Master Trust',
    description: 'Launched our flagship Master Trust scheme, bringing affordable pension solutions to SMEs across Ghana.',
  },
  {
    year: '2013',
    title: 'Digital Transformation',
    description: 'Introduced our first online portal, allowing members to check balances and update information remotely.',
  },
  {
    year: '2015',
    title: 'Expanded Reach',
    description: 'Opened regional offices in Kumasi, Takoradi, and Tamale to serve members across the country.',
  },
  {
    year: '2018',
    title: 'Innovation Award',
    description: 'Recognized for pension innovation with the Ghana Financial Services Excellence Award.',
  },
  {
    year: '2020',
    title: 'Mobile Services',
    description: 'Launched mobile app with integrated payment solutions for seamless pension management.',
  },
  {
    year: '2023',
    title: 'ESG Investment',
    description: 'Introduced sustainable investment options, aligning member values with retirement planning.',
  },
  {
    year: '2025',
    title: 'Looking Forward',
    description: 'Continuing our mission of securing financial futures for all Ghanaians through innovative pension solutions.',
  },
];

// Board of Trustees
export const boardOfTrustees = [
  {
    name: 'Dr. Kwame Adjei',
    position: 'Board Chairman',
    bio: 'Former Deputy Governor of Bank of Ghana with over 30 years of experience in financial regulation and policy development.',
    icon: 'Banknote',
  },
  {
    name: 'Mrs. Akua Danso',
    position: 'Independent Trustee',
    bio: 'Chartered Accountant and Risk Management Specialist with extensive experience in corporate governance.',
    icon: 'Scale',
  },
  {
    name: 'Prof. Samuel Mensah',
    position: 'Independent Trustee',
    bio: 'Professor of Economics and Finance at University of Ghana with expertise in pension systems and social security.',
    icon: 'GraduationCap',
  },
  {
    name: 'Ms. Esi Oforiwaa',
    position: 'Member Representative Trustee',
    bio: 'Labor Relations Expert with 15 years\' experience advocating for workers\' rights and benefits.',
    icon: 'Users',
  },
];

// Blog Posts
import { BlogPost, Author } from './schemas/blog-schema'; // Import the new types

// Define a sample author
const sampleAuthor: Author = {
  name: 'SPT Editorial Team',
  avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Replace with a generic avatar
  role: 'Content Creators',
  bio: 'Providing insights and updates on pension schemes and financial planning.',
  twitter: 'https://twitter.com/standardpensions',
  linkedin: 'https://linkedin.com/company/standard-pensions-trust',
};

export const blogPosts: BlogPost[] = [
  {
    id: 'understanding-tier-3-contributions', // Changed to be more CUID-like, though these are static
    slug: 'understanding-tier-3-pension-contributions',
    title: 'Understanding Tier 3 Pension Contributions',
    content: 'Tier 3 pension contributions are a voluntary part of Ghana\\\'s three-tier pension scheme. This article delves into the specifics of Tier 3, how it works, its benefits, and how you can leverage it to maximize your retirement savings. We will cover eligibility, contribution limits, tax advantages, and withdrawal conditions. Understanding these aspects is crucial for effective long-term financial planning and ensuring a comfortable retirement. We will also compare Tier 3 with other investment options available in Ghana.',
    excerpt: 'Explore how voluntary Tier 3 contributions can significantly enhance your retirement benefits and provide tax advantages.',
    featuredImage: {
      url: 'https://images.pexels.com/photos/7063777/pexels-photo-7063777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'Person reviewing financial documents for Tier 3 pension',
      width: 1260,
      height: 750,
    },
    category: 'Education',
    tags: ['Tier 3', 'Retirement Planning', 'Voluntary Contributions', 'Tax Benefits'],
    author: sampleAuthor,
    publishedAt: new Date('2025-04-15T10:00:00Z'),
    updatedAt: new Date('2025-04-18T10:00:00Z'),
    status: 'published',
    seo: {
      metaTitle: 'Understanding Tier 3 Pension Contributions in Ghana',
      metaDescription: 'Learn about Tier 3 voluntary pension contributions, their benefits, and how they can boost your retirement savings in Ghana.',
      keywords: ['Tier 3 Ghana', 'Voluntary Pension', 'Retirement Savings', 'Tax Benefits Ghana'],
    },
    readingTimeMinutes: 8,
    allowComments: true,
    views: 1250,
  },
  {
    id: 'pension-investment-strategies-life-stages',
    slug: 'pension-investment-strategies-for-different-life-stages',
    title: 'Pension Investment Strategies for Different Life Stages',
    content: 'Your approach to pension investment should adapt as you progress through different stages of life. Early in your career, you might opt for higher-growth, higher-risk investments. As you approach retirement, a shift towards more conservative, capital-preservation strategies is often advisable. This post explores tailored investment strategies for young professionals, mid-career individuals, and those nearing retirement, considering risk tolerance, investment horizons, and financial goals. We also discuss the importance of diversification and regular portfolio reviews.',
    excerpt: 'Learn how your pension investment approach should evolve as you progress from early career to near retirement.',
    featuredImage: {
      url: 'https://images.pexels.com/photos/7876708/pexels-photo-7876708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'Graphs and charts illustrating investment strategies over time',
      width: 1260,
      height: 750,
    },
    category: 'Planning',
    tags: ['Investment Strategy', 'Life Stages', 'Pension Planning', 'Risk Management', 'Diversification'],
    author: sampleAuthor,
    publishedAt: new Date('2025-04-08T14:30:00Z'),
    status: 'published',
    seo: {
      metaTitle: 'Pension Investment Strategies for All Life Stages',
      metaDescription: 'Discover how to tailor your pension investment strategy based on your age and career stage for optimal retirement outcomes.',
    },
    readingTimeMinutes: 10,
    allowComments: true,
    views: 980,
  },
  {
    id: 'new-pension-regulatory-changes-2025',
    slug: 'new-pension-regulatory-changes-for-2025',
    title: 'New Pension Regulatory Changes for 2025',
    content: 'The pension landscape is continually evolving. This article provides a comprehensive overview of the new regulatory changes affecting pension schemes in Ghana for the year 2025. We will break down the implications of these changes for both contributors and pension fund managers. Key areas to be discussed include updates to contribution limits, withdrawal rules, investment guidelines, and reporting requirements. Staying informed about these changes is vital for ensuring compliance and making informed decisions about your retirement savings.',
    excerpt: 'Stay informed about the latest regulatory updates affecting pension schemes in Ghana and how they impact your retirement savings.',
    featuredImage: {
      url: 'https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'Legal documents and a gavel, symbolizing regulatory changes',
      width: 1260,
      height: 750,
    },
    category: 'Regulation',
    tags: ['Pension Regulation', 'Ghana Pensions', 'NPRA Updates', 'Compliance', '2025 Changes'],
    author: sampleAuthor,
    publishedAt: new Date('2025-04-01T09:00:00Z'),
    status: 'published',
    seo: {
      metaTitle: 'Ghana Pension Regulatory Changes 2025: What You Need to Know',
      metaDescription: 'An overview of the new pension regulatory changes in Ghana for 2025 and their impact on your retirement planning.',
    },
    readingTimeMinutes: 7,
    allowComments: true,
    views: 1500,
  },
  {
    id: 'retirement-planning-for-entrepreneurs',
    slug: 'retirement-planning-for-entrepreneurs-and-self-employed',
    title: 'Retirement Planning for Entrepreneurs & Self-Employed',
    content: 'Entrepreneurs and self-employed individuals face unique challenges and opportunities when it comes to retirement planning. Unlike salaried employees, they often lack employer-sponsored pension schemes and must take a more proactive approach. This guide covers essential strategies for entrepreneurs, including choosing the right personal pension schemes (like Tier 3), understanding contribution options, managing irregular income for consistent savings, and integrating business exit strategies with retirement goals. We also touch upon tax implications and the importance of disciplined financial planning.',
    excerpt: 'Special considerations for business owners and self-employed individuals looking to secure their financial future.',
    featuredImage: {
      url: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'Entrepreneur working on a laptop in a modern office setting',
      width: 1260,
      height: 750,
    },
    category: 'Business',
    tags: ['Entrepreneurs', 'Self-Employed', 'Retirement Planning', 'Personal Pension', 'Financial Independence'],
    author: sampleAuthor,
    publishedAt: new Date('2025-03-25T11:00:00Z'),
    updatedAt: new Date('2025-03-28T11:00:00Z'),
    status: 'published',
    seo: {
      metaTitle: 'Retirement Planning Guide for Entrepreneurs in Ghana',
      metaDescription: 'Essential retirement planning tips and strategies for entrepreneurs and self-employed individuals in Ghana.',
    },
    readingTimeMinutes: 9,
    allowComments: true,
    views: 1120,
  },
  {
    id: 'maximizing-your-tier-2-benefits',
    slug: 'maximizing-your-tier-2-pension-benefits',
    title: 'Maximizing Your Tier 2 Pension Benefits',
    content: 'Tier 2 pensions form a crucial part of your mandatory retirement savings in Ghana. This article explores ways to maximize these benefits. We will discuss understanding your Tier 2 statements, the role of your employer, options upon changing jobs, and how investment performance impacts your final payout. Additionally, we will cover the process for accessing Tier 2 benefits at retirement or under other qualifying conditions. A clear understanding of Tier 2 can significantly influence your overall retirement preparedness.',
    excerpt: 'Learn how to make the most of your mandatory Tier 2 occupational pension scheme for a better retirement.',
    featuredImage: {
      url: 'https://images.pexels.com/photos/8353793/pexels-photo-8353793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'Close-up of a pension statement with a calculator and pen',
      width: 1260,
      height: 750,
    },
    category: 'Education',
    tags: ['Tier 2', 'Occupational Pension', 'Retirement Benefits', 'Ghana Pensions', 'Financial Planning'],
    author: sampleAuthor,
    publishedAt: new Date('2025-05-02T09:00:00Z'),
    status: 'published',
    seo: {
      metaTitle: 'Maximizing Tier 2 Pension Benefits in Ghana',
      metaDescription: 'A guide to understanding and maximizing your Tier 2 occupational pension benefits in Ghana for a secure retirement.',
    },
    readingTimeMinutes: 7,
    allowComments: true,
    views: 850,
  },
  {
    id: 'importance-of-early-retirement-planning',
    slug: 'the-importance-of-starting-retirement-planning-early',
    title: 'The Importance of Starting Retirement Planning Early',
    content: 'The earlier you start planning for retirement, the better your chances of achieving financial independence and a comfortable post-work life. This article highlights the power of compound interest, the benefits of long-term investment horizons, and how starting early can reduce the financial burden in later years. We provide practical tips for young professionals on how to begin their retirement savings journey, even with a modest income. It\\\'s never too early to think about your future! We will also show illustrative examples of how small, consistent savings can grow significantly over time.',
    excerpt: 'Discover why starting your retirement planning journey early can make a significant difference to your financial future.',
    featuredImage: {
      url: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'Young person putting a coin into a piggy bank, symbolizing early savings',
      width: 1260,
      height: 750,
    },
    category: 'Planning',
    tags: ['Early Planning', 'Compound Interest', 'Retirement Savings', 'Young Professionals', 'Financial Goals'],
    author: sampleAuthor,
    publishedAt: new Date('2025-05-10T14:00:00Z'),
    status: 'published',
    seo: {
      metaTitle: 'Why Starting Retirement Planning Early is Crucial',
      metaDescription: 'Understand the benefits of early retirement planning and how compound interest can work in your favor for a secure future.',
    },
    readingTimeMinutes: 6,
    allowComments: true,
    views: 1050,
  }
];

// FAQs
export const faqs = [
  {
    question: 'What is the difference between Tier 2 and Tier 3 pensions?',
    answer: 'Tier 2 is the mandatory occupational pension scheme managed by private trustees, while Tier 3 consists of voluntary contributions that provide additional tax benefits and retirement savings. Tier 3 offers more flexibility and can be used for specific goals like housing or education before retirement.',
  },
  {
    question: 'How do I check my pension balance?',
    answer: 'You can check your pension balance through our secure Member Portal, via our mobile app, by visiting any of our branch offices, or by calling our customer service line. We also send quarterly statements to your registered email address.',
  },
  {
    question: 'At what age can I access my pension benefits?',
    answer: 'The standard retirement age in Ghana is 60 years. However, early retirement is possible from age 55, though this may affect your benefit calculations. Special provisions exist for certain professions with different retirement ages.',
  },
  {
    question: 'Can I withdraw from my pension before retirement?',
    answer: 'Limited early withdrawals are possible from Tier 3 voluntary contributions for specific purposes like housing, education, or critical illness. Tier 1 and Tier 2 funds are generally locked until retirement age except in cases of permanent emigration or total incapacity.',
  },
  {
    question: 'How are my pension contributions invested?',
    answer: 'Your contributions are invested according to regulatory guidelines and our investment policy. We maintain a diversified portfolio across government securities, corporate bonds, equities, and alternative investments to balance growth and security. Members can view our investment strategy and performance reports on the Member Portal.',
  },
  {
    question: 'What happens to my pension if I change employers?',
    answer: 'Your pension benefits are portable. When changing employers, you can transfer your Tier 2 contributions to your new employer&apos;s scheme or maintain them with us if your new employer also uses Standard Pensions Trust. We provide a simple transfer process to ensure continuity.',
  },
  {
    question: 'How secure are my pension savings?',
    answer: 'Your pension savings are highly secure, protected by stringent regulatory oversight from the National Pensions Regulatory Authority (NPRA). Funds are held by independent custodians, and we maintain insurance coverage, regular audits, and robust cybersecurity measures to protect your retirement savings.',
  },
  {
    question: 'Can I increase my pension contributions?',
    answer: 'Yes, you can make additional voluntary contributions (Tier 3) to enhance your retirement benefits. These contributions often come with tax advantages and can be arranged through your employer\'s payroll system or direct deposits to your pension account.',
  },
];

// Contact Information
export const contactInfo = {
  headquarters: {
    address: '42 Nii Nortei Nyanchi Street Dzorwulu, Accra-Ghana',
    phone: '+233(0)302 780 765',
    email: 'info@standardpensionstrust.com',
    hours: 'Monday - Friday: 8:00 AM - 5:00 PM',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.8228781762046!2d-0.18683492468618836!3d5.5780774959247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9a5309ba4eb5%3A0x2b4eb2721d6e4208!2sIndependence%20Ave%2C%20Accra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1714003636727!5m2!1sen!2sus',
  },
  branches: [
    {
      city: 'Greater Accra',
      address: '42 Nii Nortei Nyanchi Street, Dzorwulu, Accra, Ghana', 
      phone: '+233 30 278 0765',
    },
    {
      city: 'Takoradi',
      address: '8 Market Circle, Takoradi, Ghana',
      phone: '+233 30 000 0002',
    },
    {
      city: 'Kumasi',
      address: '15 Adum Street, Kumasi, Ghana',
      phone: '+233 30 000 0003',
    },
  ],
  social: {
    facebook: 'https://facebook.com/standardpensionstrust',
    twitter: 'https://twitter.com/standardpensions',
    linkedin: 'https://linkedin.com/company/standard-pensions-trust',
    instagram: 'https://instagram.com/standardpensionstrust',
  },
};
