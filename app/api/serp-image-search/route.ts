import { NextResponse } from 'next/server';
import { getJson } from 'serpapi';

/* export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    const params = {
      engine: 'google_images',
      q: query,
      api_key: process.env.SERPAPI_API_KEY,
    };
    console.log('Params:', params);

    return new Promise((resolve, reject) => {
      getJson(params, (data: any) => {
        if (data.error) {
          reject(data.error);
        } else {
          const thumbnails = data.images_results.slice(0, 10).map((image: { thumbnail: string }) => image.thumbnail);
          resolve(NextResponse.json({ thumbnails }));
        }
      });
    });
  } catch (error) {
    console.error('Error in image search:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
} */


export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    const params = {
      engine: 'google_images',
      q: query,
      api_key: process.env.SERPAPI_API_KEY,
    };
    console.log('Params:', params);

    const data = await getJson(params);
    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 500 });
    } else {
      const thumbnails = data.images_results.slice(0, 10).map((image: { thumbnail: string }) => image.thumbnail);
      return NextResponse.json({ thumbnails });
    }
  } catch (error) {
    console.error('Error in image search:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
