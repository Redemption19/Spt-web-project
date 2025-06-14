import { Event } from './schemas/event-schema';

export const mockEvents: Event[] = [
  {
    id: '1',
    slug: 'annual-retirement-planning-seminar-2025',
    title: 'Annual Retirement Planning Seminar',
    date: '2025-06-27',
    time: '10:00 AM',
    venue: 'Virtual (Zoom)',
    banner: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Join us for our annual seminar on retirement planning. Learn about different pension schemes, investment strategies, and how to secure your financial future.',
    type: 'webinar',
    region: 'national',
    status: 'upcoming',
    category: 'retirement-planning',
    capacity: 500,
    currentAttendees: 324,
    dateTime: '2025-06-27T10:00:00',
    liveStreamUrl: 'https://zoom.us/j/example',
    registration: {
      isOpen: true,
      maxParticipants: 500,
      registeredParticipants: 324,
      waitingList: false,
      deadline: '2025-06-26T17:00:00',
    },
    agenda: [
      '10:00 AM - Welcome and Introduction',
      '10:15 AM - Understanding Pension Types',
      '11:00 AM - Investment Strategies',
      '11:45 AM - Q&A Session',
      '12:00 PM - Closing Remarks'
    ],
    speakers: [
      {
        name: 'Dr. Kwame Mensah',
        bio: 'Head of Investment Strategy at SPT',
        photo: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg',
      },
      {
        name: 'Mrs. Abena Osei',
        bio: 'Senior Pension Consultant',
        photo: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg',
      }
    ],
    seo: {
      metaTitle: 'Annual Retirement Planning Seminar 2025 | Standard Pensions Trust',
      metaDescription: 'Join our comprehensive retirement planning seminar to learn about pension schemes, investment strategies, and securing your financial future.',
      keywords: ['retirement planning', 'pension seminar', 'investment strategy', 'financial planning'],
    }
  },
  {
    id: '2',
    slug: 'client-workshop-pension-benefits-jun-2025',
    title: 'Client Workshop on Pension Benefits',
    date: '2025-06-15',
    time: '02:00 PM',
    venue: 'SPT Conference Center, Greater Accra',
    banner: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'A hands-on workshop for our clients to understand their pension benefits in detail. Our experts will guide you through maximizing your retirement benefits.',
    type: 'physical',
    region: 'local',
    status: 'upcoming',
    category: 'pension-education',
    capacity: 50,
    currentAttendees: 38,
    dateTime: '2025-06-15T14:00:00',
    registration: {
      isOpen: true,
      maxParticipants: 50,
      registeredParticipants: 38,
      waitingList: true,
      deadline: '2025-06-14T17:00:00',
    },
    mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.8228781762046!2d-0.18683492468618836!3d5.5780774959247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9a5309ba4eb5%3A0x2b4eb2721d6e4208!2sIndependence%20Ave%2C%20Accra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1714003636727!5m2!1sen!2sus',
    agenda: [
      '2:00 PM - Registration and Welcome',
      '2:30 PM - Understanding Your Benefits Package',
      '3:15 PM - Break',
      '3:30 PM - Interactive Session',
      '4:00 PM - One-on-One Consultations'
    ]
  },
  {
    id: '3',
    slug: 'webinar-understanding-tier-2-pensions-jul-2025',
    title: 'Webinar: Understanding Tier 2 Pensions',
    date: '2025-07-01',
    time: '11:00 AM',
    venue: 'Virtual (Microsoft Teams)',
    banner: 'https://images.pexels.com/photos/7709018/pexels-photo-7709018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'This webinar will cover the specifics of Tier 2 pension plans, eligibility, contribution requirements, and the benefits you can expect at retirement.',
    type: 'webinar',
    region: 'national',
    status: 'upcoming',
    category: 'pension-education',
    capacity: 1000,
    currentAttendees: 456,
    dateTime: '2025-07-01T11:00:00',
    liveStreamUrl: 'https://teams.microsoft.com/l/meetup-join/example',
    registration: {
      isOpen: true,
      maxParticipants: 1000,
      registeredParticipants: 456,
      waitingList: false,
      deadline: '2025-06-30T17:00:00',
    }
  },
  {
    id: '4',
    slug: 'regional-pension-consultation-kumasi-aug-2025',
    title: 'Regional Pension Consultation - Kumasi',
    date: '2025-08-20',
    time: '09:00 AM',
    venue: 'Kumasi City Hall, Ashanti Region',
    banner: 'https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Join us for a comprehensive consultation session for our regional members. Our pension experts will be available to answer all your questions and provide personalized advice.',
    type: 'physical',
    region: 'regional',
    status: 'upcoming',
    category: 'pension-education',
    registration: {
      isOpen: true,
      maxParticipants: 200,
      registeredParticipants: 89,
      deadline: '2025-08-19T17:00:00',
    }
  },
  {
    id: 'past-1',
    slug: 'annual-general-meeting-2024',
    title: 'Archive: 2024 Annual General Meeting',
    date: '2024-05-10',
    time: '09:00 AM',
    venue: 'Virtual (Zoom)',
    banner: 'https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Review of our 2024 Annual General Meeting covering company performance, investment returns, and future strategy.',
    type: 'webinar',
    region: 'national',
    status: 'past',
    category: 'general',
    archive: {
      videos: [{ label: 'Meeting Recording', url: '#' }],
      presentations: [{ label: 'Presentation Slides', url: '#' }],
    }
  },
  {
    id: 'past-2',
    slug: 'local-branch-workshop-march-2025',
    title: 'Archive: Local Branch Workshop - March 2025',
    date: '2025-03-22',
    time: '01:00 PM',
    venue: 'SPT Branch Office, Takoradi',
    banner: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Highlights from our successful local branch workshop covering retirement planning strategies and pension scheme options.',
    type: 'physical',
    region: 'local',
    status: 'past',
    category: 'retirement-planning',
    archive: {
      photos: [
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/3184305/pexels-photo-3184305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      ],
    }
  },
  {
    id: 'past-3',
    slug: 'retirement-readiness-seminar-2025',
    title: 'Archive: Retirement Readiness Seminar',
    date: '2025-01-15',
    time: '10:00 AM',
    venue: 'Accra International Conference Centre',
    banner: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'A comprehensive seminar focused on preparing for retirement with practical strategies for financial security.',
    type: 'physical',
    region: 'national',
    status: 'past',
    category: 'retirement-planning',
    archive: {
      photos: [
        'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      ],
      presentations: [{ label: 'Financial Planning Slides', url: '#' }],
      videos: [{ label: 'Keynote Address', url: '#' }],
    },
    testimonials: [
      {
        quote: 'The seminar provided invaluable insights into retirement planning. I now feel more confident about my financial future.',
        author: 'Emmanuel K., Attendee'
      },
      {
        quote: 'Clear, practical advice that anyone can follow. The presenters were knowledgeable and engaging.',
        author: 'Sarah A., Participant'
      }
    ]
  }
];
