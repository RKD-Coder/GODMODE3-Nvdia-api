import { NextResponse } from 'next/server'

const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions'

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader) {
      return NextResponse.json({ error: { message: 'Missing API Key' } }, { status: 401 })
    }

    const body = await request.json()

    // Handle streaming vs non-streaming
    const response = await fetch(NVIDIA_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      try {
        const errorJson = JSON.parse(errorText)
        return NextResponse.json(errorJson, { status: response.status })
      } catch (e) {
        return NextResponse.json({ error: { message: errorText } }, { status: response.status })
      }
    }

    if (body.stream) {
      // Create a ReadableStream from the response body and return it
      return new NextResponse(response.body, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      })
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error: any) {
    console.error('API proxy error:', error)
    return NextResponse.json({ error: { message: error.message || 'Internal Server Error' } }, { status: 500 })
  }
}
