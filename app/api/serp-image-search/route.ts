import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    const apiKey = process.env.SERP_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'SERP API key is missing' }, { status: 500 });
    }

    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&tbm=isch&api_key=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch images from SERP API');
    }

    const data = await response.json();
    const thumbnails = data.images_results?.map((img: any) => img.thumbnail) || [];

    return NextResponse.json({ thumbnails });
  } catch (error) {
    console.error('Error in SERP image search:', error);
    return NextResponse.json({ error: 'An error occurred while fetching images' }, { status: 500 });
  }
}
