import { NextRequest, NextResponse } from 'next/server';

async function fetchData() {
  const apiKey = '12345'; //
  const apiUrl = '';

  const headers = new Headers();
  headers.append('Authorization', `ChaletManager-Key ${apiKey}`);
  headers.append('Content-Type', 'application/json');

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: headers,
    });
    const data = await response.json();
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function GET(req: NextRequest) {
  try {
    const data = await fetchData();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(error.message);
  }
}
