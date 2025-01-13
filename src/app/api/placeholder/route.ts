import { NextResponse } from 'next/server'

export async function GET() {
  // Create a simple SVG placeholder
  const svg = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#f0f0f0"/>
      <path d="M85,50 L85,150 L150,100 Z" fill="#999"/>
      <text x="100" y="180" font-family="Arial" font-size="14" fill="#666" text-anchor="middle">
        No Image
      </text>
    </svg>
  `

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
} 