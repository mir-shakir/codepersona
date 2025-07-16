'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from 'recharts'

interface LanguageDistributionRadarChartProps {
  data: {
    languageDistribution: { [key: string]: number }
  }
}

export function LanguageDistributionRadarChart({
  data,
}: LanguageDistributionRadarChartProps) {
  const processData = () => {
    const languages = data?.languageDistribution
    if (!languages || Object.keys(languages).length === 0) {
      return []
    }

    const total = Object.values(languages).reduce((acc, val) => acc + val, 0)
    if (total === 0) {
      return []
    }

    return Object.entries(languages)
      .map(([name, value]) => ({
        subject: name,
        A: (value / total) * 100,
        fullMark: 100,
      }))
      .sort((a, b) => b.A - a.A) // Sort by percentage
      .slice(0, 8) // Limit to top 8 languages for readability
  }

  const chartData = processData()

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Language Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-96 flex items-center justify-center">
          <p className="text-muted-foreground">
            Not enough language data to display.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Language Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar
              name="Language Proficiency"
              dataKey="A"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.6}
            />
            <defs>
              <linearGradient id="languageGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
