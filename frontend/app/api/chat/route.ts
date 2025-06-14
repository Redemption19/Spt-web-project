import { NextResponse } from 'next/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export async function GET() {
  return NextResponse.json({ message: 'Chat API is working' });
}

export async function POST(req: Request) {
  try {
    const { messages, stream = false } = await req.json();
    
    console.log('Chat request received with messages count:', messages.length);
    console.log('Streaming mode:', stream);
    console.log('API Key exists:', !!process.env.OPENROUTER_API_KEY);
    
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('OPENROUTER_API_KEY is not configured');
      return NextResponse.json(
        { error: 'API key not configured. Please set OPENROUTER_API_KEY in your .env.local file.' },
        { status: 500 }
      );
    }

    // Prepare the request body with optional streaming
    const requestBody = {
      model: "deepseek/deepseek-r1-0528:free",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for SPT Pension Trust. Your primary focus is providing accurate information about pension schemes, enrollment processes, benefits, and retirement planning. Always format your responses using markdown: Use **bold** for emphasis, create numbered lists with 1., 2., etc., and bullet points with - for lists. Use emojis where appropriate to make your answers more engaging. When referencing specific pages or schemes, always use proper markdown links like [Page Name](https://example.com/path) rather than just showing the path."
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 2000,
      stream: stream
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "SPT Pension Trust",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    // Handle streaming response
    if (stream && response.ok) {
      // Create a new readable stream to forward the streaming response
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      
      let counter = 0;
      let buffer = '';
      
      const transformStream = new TransformStream({
        async transform(chunk, controller) {
          counter++;
          const text = decoder.decode(chunk);
          // Process and send the chunk
          controller.enqueue(encoder.encode(text));
        },
        flush(controller) {
          // Ensure any remaining buffered content is sent
          if (buffer.length > 0) {
            controller.enqueue(encoder.encode(buffer));
          }
        }
      });

      // Return the streaming response
      return new Response(response.body?.pipeThrough(transformStream), {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      });
    }

    // Handle non-streaming response
    console.log('OpenRouter API response status:', response.status);
    
    const data = await response.json();
    console.log('OpenRouter API response data:', data);

    if (!response.ok) {
      console.error('OpenRouter API error:', data);
      throw new Error(data.error?.message || `API request failed with status ${response.status}`);
    }

    if (!data.choices || !data.choices[0]) {
      console.error('Unexpected API response structure:', data);
      throw new Error('Invalid response structure from AI service');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process chat request' },
      { status: 500 }
    );
  }
} 