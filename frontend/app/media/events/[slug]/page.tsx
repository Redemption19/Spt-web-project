import React from 'react';
import EventRegistrationForm from '@/components/events/EventRegistrationForm';
import EventCountdown from '@/components/events/EventCountdown';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, Download, Video, ArrowLeft } from 'lucide-react';
import { addToCalendar } from '@/lib/utils/calendar';
import { mockEvents } from '@/lib/mock-events';

export async function generateStaticParams() {
  // Generate static paths for all events
  return mockEvents.map((event) => ({
    slug: event.slug,
  }));
}

interface Props {
  params: {
    slug: string;
  };
}

interface EventDetails {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  banner?: string;
  description: string;
  agenda?: string[];
  speakers?: { name: string; bio: string; photo?: string }[];
  registrationLink: string;
  mapLink?: string;
  status: 'upcoming' | 'past';
  archive?: {
    photos?: string[];
    presentations?: { label: string; url: string }[];
    videos?: { label: string; url: string }[];
  };
  capacity?: number;
  currentAttendees?: number;  dateTime?: string;  socialShareUrls?: { facebook?: string; linkedin?: string; whatsapp?: string; twitter?: string; };
  liveStreamUrl?: string;
  testimonials?: { quote: string; author: string; }[];
  newsletterSignupUrl?: string;
}

const mockDetailedEvents: EventDetails[] = [
  {
    id: '1',
    title: 'Annual Retirement Planning Seminar',
    date: 'October 27, 2023',
    time: '10:00 AM - 12:00 PM',
    venue: 'Virtual (Zoom)',
    banner: '/images/event-banner-1.jpg',
    description: 'Join us for our annual seminar on retirement planning. Learn about different pension schemes, investment strategies, and how to secure your financial future.',
    agenda: [
      '10:00 AM: Introduction to Retirement Planning',
      '10:30 AM: Exploring Pension Options',
      '11:15 AM: Investment Strategies for Retirement',
      '11:45 AM: Q&A',
    ],
    speakers: [
      { name: 'Dr. Jane Smith', bio: 'Expert in retirement finance.', photo: '/images/speaker-jane.jpg' },
      { name: 'Mr. John Doe', bio: 'Certified Financial Advisor.' },
    ],
    registrationLink: '#',
    mapLink: undefined, // Virtual event
    status: 'upcoming',
    capacity: 500,
    currentAttendees: 450,
    dateTime: '2023-10-27T10:00:00',
    testimonials: [
      { quote: 'Very informative session!', author: 'A. Wong' },
      { quote: 'Learned a lot about my pension options.', author: 'B. Tan' },
    ],
    newsletterSignupUrl: '#',
    socialShareUrls: { facebook: '#', linkedin: '#' },
    liveStreamUrl: 'https://zoom.us/j/1234567890', // Example Zoom link
  },
  {
    id: '2',
    title: 'Client Workshop on Pension Benefits',
    date: 'November 15, 2023',
    time: '02:00 PM - 04:00 PM',
    venue: 'Conference Room A, 123 Financial St',
    banner: '/images/event-banner-2.jpg',
    description: 'A hands-on workshop for our clients to understand their pension benefits in detail. Bring your questions!',
    agenda: [
      '02:00 PM: Overview of Client Benefits',
      '02:45 PM: How to Access and Manage Your Pension',
      '03:30 PM: Interactive Q&A',
    ],
    speakers: [
      { name: 'Ms. Emily White', bio: 'Client Relations Manager.', photo: '/images/speaker-emily.jpg' },
    ],
    registrationLink: '#',
    mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1dlatitude!2dlongitude!3d...!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM consciously replace with actual map embed URL!5e0!3m2!1sen!2sus!4vinsertTimestampHere!5m2!1sen!2sus',
    status: 'upcoming',
    capacity: 50,
    currentAttendees: 48,
    dateTime: '2023-11-15T14:00:00',
    testimonials: [{ quote: 'Workshop was very helpful.', author: 'C. Lim' }],
    newsletterSignupUrl: '#',
    socialShareUrls: { facebook: '#', twitter: '#' },
    liveStreamUrl: undefined, // Physical event
  },
  {
    id: '3',
    title: 'Webinar: Understanding Tier 2 Pensions',
    date: 'December 1, 2023',
    time: '11:00 AM - 12:00 PM',
    venue: 'Virtual (Microsoft Teams)',
    banner: undefined,
    description: 'This webinar will cover the specifics of Tier 2 pension plans, eligibility, contributions, and benefits.',
    agenda: [
      '11:00 AM: Introduction to Tier 2 Pensions',
      '11:30 AM: Eligibility and Contributions',
      '11:45 AM: Benefits and Payouts',
    ],
    speakers: [], // No specific speakers highlighted
    registrationLink: '#',
    mapLink: undefined, // Virtual event
    status: 'upcoming',
  },
  {
    id: 'past-1',
    title: 'Archive: 2022 Annual General Meeting',
    date: 'May 10, 2022',
    time: '09:00 AM',
    venue: 'Virtual (Zoom)',
    banner: undefined,
    description: 'Summary of the 2022 Annual General Meeting.',
    agenda: [],
    speakers: [],
    registrationLink: '#', // Or link to archive page
    mapLink: undefined,
    status: 'past',
    archive: {
      videos: [{ label: 'Meeting Recording', url: '#' }],
      presentations: [{ label: 'Presentation Slides', url: '#' }],
    },
    dateTime: '2022-05-10T09:00:00',
    testimonials: [
      { quote: 'Well organized AGM.', author: 'D. Lee' },
    ],
    newsletterSignupUrl: undefined,
    socialShareUrls: undefined,
    liveStreamUrl: undefined, // Link might be in archive videos
  },
];

// Helper function to format date for calendar links
const formatForCalendar = (dateStr: string, timeStr: string): { start: string; end: string } | null => {
  // Basic parsing, assumes 'Month Day, Year' and 'HH:MM AM/PM - HH:MM AM/PM'
  try {
    const [monthDayYear, ...timeParts] = dateStr.split(' ');
    const timeRange = timeParts.join(' ') + ' ' + timeStr; // Recombine and add timeStr

    const [startTime, endTime] = timeRange.split(' - ').map(t => t.trim());

    const startDateTimeStr = `${dateStr} ${startTime}`.trim();
    const endDateTimeStr = `${dateStr} ${endTime}`.trim();

    // Attempt to parse dates. This is a basic approach and might need more robust parsing 
    // depending on the exact date/time formats used in your data.
    const startDate = new Date(startDateTimeStr);
    const endDate = new Date(endDateTimeStr);

    // Format to YYYYMMDDTHHMMSSZ or YYYYMMDDTHHMMSS
    // Using a simple format without timezone for now.
    const formatComponent = (datePart: number) => datePart.toString().padStart(2, '0');
    const formatYear = (year: number) => year.toString();

    const start = `${formatYear(startDate.getFullYear())}${formatComponent(startDate.getMonth() + 1)}${formatComponent(startDate.getDate())}T${formatComponent(startDate.getHours())}${formatComponent(startDate.getMinutes())}${formatComponent(startDate.getSeconds())}`;
    const end = `${formatYear(endDate.getFullYear())}${formatComponent(endDate.getMonth() + 1)}${formatComponent(endDate.getDate())}T${formatComponent(endDate.getHours())}${formatComponent(endDate.getMinutes())}${formatComponent(endDate.getSeconds())}`;

    return { start, end };

  } catch (error) {
    console.error('Error formatting date for calendar:', error);
    return null;
  }
};

const createGoogleCalendarLink = (event: EventDetails): string | null => {
  const dates = formatForCalendar(event.date, event.time);
  if (!dates) return null;

  const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  const text = encodeURIComponent(event.title);
  const datesParam = `${dates.start}/${dates.end}`;
  const details = encodeURIComponent(event.description + (event.agenda ? '\n\nAgenda:\n' + event.agenda.join('\n') : '') + (event.speakers ? '\n\nSpeakers:\n' + event.speakers.map(s => s.name + (s.bio ? ` - ${s.bio}` : '')).join('\n') : ''));
  const location = encodeURIComponent(event.venue);

  return `${baseUrl}&text=${text}&dates=${datesParam}&details=${details}&location=${location}`;
};

const createOutlookCalendarLink = (event: EventDetails): string | null => {
  const dates = formatForCalendar(event.date, event.time);
  if (!dates) return null;

  const baseUrl = 'https://outlook.live.com/owa/?path=/calendar/action/compose&rru=addevent';
  const subject = encodeURIComponent(event.title);
  const startdt = encodeURIComponent(dates.start);
  const enddt = encodeURIComponent(dates.end);
  const body = encodeURIComponent(event.description + (event.agenda ? '\n\nAgenda:\n' + event.agenda.join('\n') : '') + (event.speakers ? '\n\nSpeakers:\n' + event.speakers.map(s => s.name + (s.bio ? ` - ${s.bio}` : '')).join('\n') : ''));
  const location = encodeURIComponent(event.venue);

  return `${baseUrl}&subject=${subject}&startdt=${startdt}&enddt=${enddt}&body=${body}&location=${location}`;
};

const createAppleCalendarLink = (event: EventDetails): string | null => {
  const dates = formatForCalendar(event.date, event.time);
  if (!dates) return null;

  const calendarContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${dates.start}`,
    `DTEND:${dates.end}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n') + (event.agenda ? '\\n\\nAgenda:\\n' + event.agenda.join('\\n').replace(/\n/g, '\\n') : '') + (event.speakers ? '\\n\\nSpeakers:\\n' + event.speakers.map(s => s.name + (s.bio ? ` - ${s.bio}` : '')).join('\\n').replace(/\n/g, '\\n') : '')}`,
    `LOCATION:${event.venue.replace(/\n/g, '\\n')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\n');

  // Data URL for .ics file
  return `data:text/calendar;charset=utf8,${encodeURIComponent(calendarContent)}`;
};

export default function EventDetailsPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Find the event with the matching slug
  const event = mockDetailedEvents.find((event) => event.id === slug);

  if (!event) {
    // Handle case where event is not found (e.g., show a 404 message)
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Event Not Found</h1>
        <p>The event with ID {slug} could not be found.</p>
      </div>
    );
  }

  // Generate calendar links
  const googleCalendarLink = event.status === 'upcoming' ? createGoogleCalendarLink(event) : null;
  const outlookCalendarLink = event.status === 'upcoming' ? createOutlookCalendarLink(event) : null;
  const appleCalendarLink = event.status === 'upcoming' ? createAppleCalendarLink(event) : null;

  const handleAddToCalendar = (event: EventDetails) => {
    addToCalendar({
      title: event.title,
      description: event.description,
      startTime: event.dateTime || `${event.date}T${event.time.split(' - ')[0]}`,
      location: event.venue,
      duration: 120 // Default to 2 hours
    });
  };

  return (
    <div className="container mx-auto py-8">
      {event.banner && (
        <div className="relative w-full h-64 mb-6">
          <Image
            src={event.banner}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Main content */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{event.description}</p>

          {/* Event details */}
          <Card className="mb-6">
            <CardContent className="grid sm:grid-cols-2 gap-4 p-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{event.venue}</span>
              </div>
              {event.capacity && (
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{event.currentAttendees} / {event.capacity} attendees</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Agenda */}
          {event.agenda && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Agenda</h2>
              <ul className="space-y-2">
                {event.agenda.map((item, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Speakers */}
          {event.speakers && event.speakers.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Speakers</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {event.speakers.map((speaker, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      {speaker.photo && (
                        <div className="relative w-16 h-16 mb-3">
                          <Image
                            src={speaker.photo}
                            alt={speaker.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                      )}
                      <h3 className="font-bold">{speaker.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{speaker.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <Card className="mb-4">
            <CardContent className="p-6">
              <div className="space-y-4">
                <Button className="w-full" onClick={() => window.location.href = event.registrationLink}>
                  Register Now
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleAddToCalendar(event)}
                >
                  Add to Calendar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Archive materials if event is past */}
          {event.status === 'past' && event.archive && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Event Materials</h3>
                <div className="space-y-2">
                  {event.archive.presentations?.map((presentation, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full flex items-center gap-2"
                      asChild
                    >
                      <a href={presentation.url} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4" />
                        {presentation.label}
                      </a>
                    </Button>
                  ))}
                  {event.archive.videos?.map((video, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full flex items-center gap-2"
                      asChild
                    >
                      <a href={video.url} target="_blank" rel="noopener noreferrer">
                        <Video className="w-4 h-4" />
                        {video.label}
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}