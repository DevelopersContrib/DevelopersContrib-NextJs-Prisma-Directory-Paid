import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const domain = searchParams.get('domain');
  const email = searchParams.get('email');

  // Validate required parameters
  if (!name || !domain || !email) {
    return NextResponse.json(
      { error: 'Missing required parameters: name, domain, and email.' },
      { status: 400 }
    );
  }

  const apiUrl = `https://api1.contrib.co/v2/directory/SendEmail?name=${encodeURIComponent(
    name
  )}&domain=${encodeURIComponent(domain)}&email=${encodeURIComponent(email)}`;

  try {
    const response = await fetch(apiUrl, { method: 'GET' });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error sending email:', errorText);
      return NextResponse.json(
        { error: 'Failed to send email.' },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: 'Email sent successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Internal Server Error while sending email.' },
      { status: 500 }
    );
  }
}
