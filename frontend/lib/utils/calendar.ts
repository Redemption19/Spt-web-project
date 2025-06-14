interface CalendarEvent {
  title: string;
  description: string;
  startTime: string;
  location: string;
  duration?: number;
}

export function addToCalendar({ title, description, startTime, location, duration = 60 }: CalendarEvent) {
  const startDate = new Date(startTime);
  const endDate = new Date(startDate.getTime() + duration * 60000);

  // Format dates according to RFC5545
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const start = formatDate(startDate);
  const end = formatDate(endDate);

  // Prepare event details
  const details = {
    title: encodeURIComponent(title),
    description: encodeURIComponent(description),
    location: encodeURIComponent(location),
    start,
    end,
  };

  // Generate calendar URLs
  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${details.title}&dates=${start}/${end}&details=${details.description}&location=${details.location}`;
  
  const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${details.title}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}&body=${details.description}&location=${details.location}`;
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\n');

  // Create a Blob containing the ICS data
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const icsUrl = URL.createObjectURL(blob);

  // Show calendar options dialog
  const dialog = document.createElement('dialog');
  dialog.innerHTML = `
    <div class="p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <h3 class="text-lg font-bold mb-4">Add to Calendar</h3>
      <div class="space-y-2">
        <a href="${googleUrl}" target="_blank" rel="noopener noreferrer" class="block px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-center">
          Google Calendar
        </a>
        <a href="${outlookUrl}" target="_blank" rel="noopener noreferrer" class="block px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-center">
          Outlook Calendar
        </a>
        <a href="${icsUrl}" download="event.ics" class="block px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-center">
          Download ICS File
        </a>
      </div>
      <form method="dialog" class="mt-4 text-center">
        <button class="text-sm text-gray-500 hover:text-gray-700">Close</button>
      </form>
    </div>
  `;
  
  document.body.appendChild(dialog);
  dialog.showModal();

  dialog.addEventListener('close', () => {
    URL.revokeObjectURL(icsUrl);
    document.body.removeChild(dialog);
  });
}
