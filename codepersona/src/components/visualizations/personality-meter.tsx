'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PersonalityScore } from '@/types'

interface PersonalityMeterProps {
  score: number // Score from 0 to 1
  personalityName: string
}

export function PersonalityMeter({
  score,
  personalityName,
}: PersonalityMeterProps) {
  const circumference = 2 * Math.PI * 45 // 2 * pi * radius
  const strokeDashoffset = circumference - score * circumference

  const gradientId = `meterGradient-${personalityName.replace(/\s/g, '')}`

  return (
    <Card>
      <CardHeader>
        <CardTitle>{personalityName}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <linearGradient
                id={gradientId}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            {/* Background circle */}
            <circle
              className="text-gray-200"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
            />
            {/* Progress circle */}
            <circle
              className="transition-all duration-1000 ease-out"
              strokeWidth="10"
              stroke={`url(#${gradientId})`}
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-foreground">
              {(score * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
