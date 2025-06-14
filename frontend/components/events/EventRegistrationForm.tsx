import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface EventRegistrationFormProps {
  eventId: string;
  // Potentially pass session options here if needed
}

const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({ eventId }) => {
  // Basic state for form fields (can be expanded)
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [preferredSession, setPreferredSession] = React.useState('');
  const [addReminders, setAddReminders] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Registering for event', eventId, {
      name,
      email,
      phone,
      preferredSession,
      addReminders,
    });
    // In a real application, you would send this data to your backend API
    alert('Registration form submitted. Check console for data.');
  };
  return (
    <div className="mt-8 p-6 border-t-4 border-t-primary border border-border/50 rounded-lg bg-card">
      <h2 className="text-2xl font-semibold mb-4">Register for this Event</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your full name"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
              className="mt-1.5"
            />
          </div>
        </div>        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="mt-1.5"
          />
        </div>

        {/* Placeholder for Preferred Session if applicable */}
        {/* You can uncomment and customize this section when needed
        <div>
          <Label htmlFor="session">Preferred Session</Label>
          <Select
            id="session"
            value={preferredSession}
            onValueChange={setPreferredSession}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a session" />
            </SelectTrigger>
            <SelectContent>
              {["Morning", "Afternoon"].map((session) => (
                <SelectItem key={session} value={session.toLowerCase()}>
                  {session}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        */}<div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="reminders"
              checked={addReminders}
              onCheckedChange={(checked) => setAddReminders(!!checked)}
            />
            <Label
              htmlFor="reminders"
              className="text-sm text-muted-foreground"
            >
              Send me event reminders via email and SMS
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              required
            />
            <Label
              htmlFor="terms"
              className="text-sm text-muted-foreground"
            >
              I agree to SPT&apos;s Terms and Conditions and Privacy Policy
            </Label>
          </div>
        </div>
        <div>
          <Button type="submit" className="w-full hero-button">
            Register for Event
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EventRegistrationForm; 