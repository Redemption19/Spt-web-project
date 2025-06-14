import { Metadata } from 'next';
import ClaudeStyleChat from '@/app/components/ClaudeStyleChat';

export const metadata: Metadata = {
  title: 'Chat with SPT Assistant',
  description: 'Get instant answers to your pension-related questions',
};

export default function ChatPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">
          Chat with SPT Assistant
        </h1>
        <p className="text-center mb-8 text-muted-foreground">
          Ask me anything about pensions, benefits, or our services
        </p>
        <div className="border rounded-xl shadow-md overflow-hidden h-[700px] bg-background">
          <ClaudeStyleChat />
        </div>
      </div>
    </div>
  );
} 