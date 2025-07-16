'use client'

import { Button } from '@/components/ui/button'
import { Share2, Twitter } from 'lucide-react'

interface ResultsClientProps {
  shareUrl: string
  shareText: string
}

export function ResultsClient({ shareUrl, shareText }: ResultsClientProps) {
  return (
    <div className="text-center mt-8 flex justify-center space-x-4">
      <Button asChild>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter className="mr-2 h-4 w-4" />
          Share on Twitter
        </a>
      </Button>
      <Button onClick={() => navigator.clipboard.writeText(shareUrl)}>
        <Share2 className="mr-2 h-4 w-4" />
        Copy Link
      </Button>
    </div>
  )
}
